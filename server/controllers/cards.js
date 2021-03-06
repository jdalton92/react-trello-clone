const cardsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const List = require("../models/list");
const Card = require("../models/card");

cardsRouter.post(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { listId, cardText } = request.body;

    const list = await List.findById(listId);
    const cardIndex = list.cards.length;

    const card = new Card({
      list: listId,
      cardText,
      cardIndex,
    });

    list.cards = list.cards.concat(card._id);

    try {
      await list.save();
      const result = await card.save();
      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

cardsRouter.put(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    const {
      newListId,
      oldListId,
      cardText,
      oldCardIndex,
      newCardIndex,
      changeType,
    } = request.body;

    // Update list object depending on change type
    let updatedCard = {};
    if (changeType === "moveCard") {
      updatedCard = {
        list: newListId,
        cardIndex: newCardIndex,
      };

      if (oldListId === newListId) {
        // Update cardIndex if within same list
        // listId of moved card is changed within try/catch block below
        await Card.updateMany(
          {
            $and: [
              { list: oldListId },
              { cardIndex: { $gte: newCardIndex } },
              { cardIndex: { $lt: oldCardIndex } },
            ],
          },
          { $inc: { cardIndex: +1 } }
        );
        await Card.updateMany(
          {
            $and: [
              { list: oldListId },
              { cardIndex: { $gt: oldCardIndex } },
              { cardIndex: { $lte: newCardIndex } },
            ],
          },
          { $inc: { cardIndex: -1 } }
        );
      } else {
        // Update cardIndex if move to different list
        // listId of moved card is changed within try/catch block below
        await Card.updateMany(
          {
            $and: [{ list: oldListId }, { cardIndex: { $gt: oldCardIndex } }],
          },
          { $inc: { cardIndex: -1 } }
        );
        await Card.updateMany(
          {
            $and: [{ list: newListId }, { cardIndex: { $gte: newCardIndex } }],
          },
          { $inc: { cardIndex: +1 } }
        );
      }
    } else if (changeType === "changeTitle") {
      updatedCard = {
        cardText,
      };
    }

    try {
      const result = await Card.findByIdAndUpdate(
        request.params.id,
        updatedCard,
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

cardsRouter.delete(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const card = await Card.findById(request.params.id);
      const list = await List.findById(card.list);
      list.cards = list.cards.filter((c) => c._id !== request.params.id);

      await Card.findByIdAndDelete(request.params.id);
      await Card.updateMany(
        {
          $and: [{ list: card.list }, { cardIndex: { $gt: card.cardIndex } }],
        },
        { $inc: { cardIndex: -1 } }
      );
      list.save();

      response.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

module.exports = cardsRouter;
