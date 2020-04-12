const boardsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const User = require("../models/user");

boardsRouter.get(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const user = await User.findById(decodedToken.id);

      const boards = await Board.find({
        user: user._id,
      });

      response.status(200).json(boards);
    } catch (e) {
      next(e);
    }
  }
);

boardsRouter.get(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const board = await Board.findById(request.params.id).populate({
        path: "lists",
        populate: {
          path: "cards",
        },
      });

      response.status(200).json(board);
    } catch (e) {
      next(e);
    }
  }
);

boardsRouter.post(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { boardName, boardDescription } = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    const user = await User.findById(decodedToken.id);

    const board = new Board({
      boardName,
      boardDescription,
      lastModified: Date.now(),
    });

    board.user = user._id;
    user.boards = user.boards.concat(board._id);

    try {
      await board.save();
      await user.save();
      response.status(201).json(board);
    } catch (e) {
      next(e);
    }
  }
);

boardsRouter.delete(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      const board = await Board.findById(request.params.id);
      const user = await User.findById(decodedToken.id);
      user.boards = user.boards.filter((b) => b !== request.params.id);

      if (board.user.toString() === decodedToken.id) {
        await Card.deleteMany({ list: { $in: board.lists } });
        await List.deleteMany({ board: request.params.id });
        await Board.findByIdAndRemove(request.params.id);
        user.save();
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = boardsRouter;
