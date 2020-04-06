const listsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const List = require("../models/list");
const Board = require("../models/board");

// OBJECT RETURNED FROM api/boards HAS LIST/CARD DETAILS
// listsRouter.get(
//   "/",
//   middleware.tokenValidate,
//   async (request, response, next) => {
//     const { boardId } = request.body;
//     try {
//       const lists = await List.find({
//         board: boardId,
//       }).populate("cards");

//       response.status(200).json(lists);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

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
      cards: [...cards],
    };

    try {
      const result = await List.findByIdAndUpdate(
        request.params.id,
        updatedList,
        {
          new: true,
        }
      );
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

      const list = await List.findById(request.params.id);

      if (board.user.toString() === decodedToken.id) {
        await List.findByIdAndRemove(request.params.id);
        // TO DO
        // DELETE CARDS
        // DELETE LISTS FROM BOARDS DB
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
