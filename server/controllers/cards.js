const cardsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const List = require("../models/list");
const Board = require("../models/board");

cardsRouter.put(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { listTitle, listIndex, boardId, cards, changeType } = request.body;

    // Update list object depending on change type
    let updatedList = {};
    if (changeType === "moveList") {
      updatedList = {
        listIndex,
      };
    } else if (changeType === "changeTitle") {
      updatedList = {
        listTitle,
      };
    } else if (changeType === "saveCards") {
      updatedList = {
        cards,
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

module.exports = cardsRouter;
