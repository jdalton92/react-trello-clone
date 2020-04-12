const listsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const List = require("../models/list");
const Board = require("../models/board");
const Card = require("../models/card");

listsRouter.post(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { listTitle, boardId } = request.body;

    const board = await Board.findById(boardId);
    const listIndex = board.lists.length;

    const list = new List({
      listTitle,
      board: boardId,
      listIndex,
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
    const {
      listTitle,
      oldListIndex,
      newListIndex,
      boardId,
      changeType,
    } = request.body;

    // Update list object depending on change type
    let updatedList = {};
    if (changeType === "moveList") {
      updatedList = {
        listIndex: newListIndex,
      };
      await List.updateMany(
        {
          $and: [
            { listIndex: { $ne: oldListIndex } },
            { listIndex: { $gte: newListIndex } },
            { listIndex: { $lt: oldListIndex } },
          ],
        },
        { $inc: { listIndex: +1 } }
      );
      await List.updateMany(
        {
          $and: [
            { listIndex: { $gt: oldListIndex } },
            { listIndex: { $lte: newListIndex } },
          ],
        },
        { $inc: { listIndex: -1 } }
      );
    } else if (changeType === "changeTitle") {
      updatedList = {
        listTitle,
      };
    }

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
      // Remove List
      const deletedList = await List.findByIdAndRemove(request.params.id);
      // Update remaing lists index
      await List.updateMany(
        { listIndex: { $gt: deletedList.listIndex } },
        { $inc: { listIndex: -1 } }
      );
      // Remove cards from deleted list
      await Card.deleteMany({ list: request.params.id });
      // Remove list from board object
      const board = await Board.findById(deletedList.board);

      board.lists = board.lists.filter(
        (l) => l.toString() !== request.params.id
      );

      board.lastModified = Date.now();
      board.save();
      response.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

module.exports = listsRouter;
