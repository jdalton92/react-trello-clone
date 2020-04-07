const listsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const List = require("../models/list");
const Board = require("../models/board");

listsRouter.post(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { listTitle, listIndex, boardId } = request.body;

    const board = await Board.findById(boardId);

    const list = new List({
      listTitle,
      listIndex,
      board: boardId,
    });

    board.lists = board.lists.concat(list._id);
    board.lastModified = Date.now();

    try {
      await board.save();
      const result = await list.save();
      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

listsRouter.put(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { listTitle, listIndex, boardId, cards } = request.body;

    const updatedList = {
      listTitle,
      listIndex,
      board: boardId,
      cards,
    };

    const board = await Board.findById(boardId);
    board.lastModified = Date.now();

    try {
      const result = await List.findByIdAndUpdate(
        request.params.id,
        updatedList,
        {
          new: true,
        }
      );
      board.save();
      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

listsRouter.delete(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      if (board.user.toString() === decodedToken.id) {
        await List.findByIdAndRemove(request.params.id);

        // Remove list from board object
        const board = await Board.findById(request.params.id);
        board.lists = board.lists.filter((l) => l !== decodedToken.id);
        board.lastModified = Date.now();
        board.save();

        response.status(204).end();
      } else {
        response.status(404).end();
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = listsRouter;
