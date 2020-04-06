const cardsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Card = require("../models/card");
const List = require("../models/list");

cardsRouter.post(
  "/",
  middleware.tokenValidate,
  async (request, response, next) => {
    const { cardText, cardIndex, listId } = request.body;

    const list = await List.findById(listId);

    const card = new Card({
      cardText,
      cardIndex,
      list: listId,
    });

    list.cards = list.cards.concat(card._id);

    try {
      const result = await card.save();
      await list.save();
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
    const { cardText, cardIndex, listId } = request.body;

    const updatedCard = {
      cardText,
      cardIndex,
      list: listId,
    };

    const oldCard = await Card.findById(request.params.id);

    try {
      const result = await Card.findByIdAndUpdate(
        request.params.id,
        updatedCard,
        {
          new: true,
        }
      );

      if (oldCard.list !== listId) {
        const oldList = await List.findById(oldCard.list);
        oldList.cards = oldList.card.filter((c) => c !== oldCard._id);

        const newList = await List.findById(listId);
        newList.cards = newList.cards.concat(result._id);

        await oldList.save();
        await newList.save();
      }

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
      const list = await List.findById(card._id);

      list.cards = list.cards.filter((c) => c !== card._id);
      await list.save();

      await Card.findByIdAndRemove(request.params.id);

      response.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

module.exports = cardsRouter;
