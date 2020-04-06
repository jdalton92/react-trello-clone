const boardsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Board = require("../models/board");
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
      const board = await board.findById(request.params.id).populate({
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
    user.boards = user.boards.concat(dashboard._id);

    try {
      await board.save();
      await user.save();
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

      if (board.user.toString() === decodedToken.id) {
        await Board.findByIdAndRemove(request.params.id);
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
