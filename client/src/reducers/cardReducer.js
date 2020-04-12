const cardReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_CARDS": {
      const { cards } = action.payload;
      return cards;
    }
    case "ADD_CARD": {
      const { _id, cardText, listId, cardIndex } = action.payload;
      return [...state, { _id, list: listId, cardText, cardIndex }];
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, _id } = action.payload;
      const updatedCard = state.filter((c) => c._id === _id);
      const restofCards = state.filter((c) => c._id !== _id);
      updatedCard[0].cardText = cardText;
      return [...restofCards, ...updatedCard];
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    case "MOVE_CARD": {
      const {
        oldListId,
        newListId,
        oldCardIndex,
        newCardIndex,
      } = action.payload;
      // Move within the same list
      if (oldListId === newListId) {
        const activeListCards = state.filter((c) => c.list === oldListId);
        const remainingCards = state.filter((c) => c.list !== oldListId);
        const newCard = activeListCards.filter(
          (c) => c.cardIndex === oldCardIndex
        );
        const otherCards = activeListCards.filter(
          (c) => c.cardIndex !== oldCardIndex
        );
        newCard[0].cardIndex = newCardIndex;
        otherCards.forEach((c) => {
          if (c.cardIndex >= newCardIndex && c.cardIndex < oldCardIndex) {
            c.cardIndex += 1;
            return c;
          } else if (
            c.cardIndex > oldCardIndex &&
            c.cardIndex <= newCardIndex
          ) {
            c.cardIndex -= 1;
            return c;
          } else {
            return c;
          }
        });
        return [...remainingCards, ...otherCards, newCard[0]];
      }

      // If card moved to other list
      const oldListCards = state.filter((c) => c.list === oldListId);
      const newListCards = state.filter((c) => c.list === newListId);
      const remainingCards = state.filter(
        (c) => c.list !== oldListId && c.list !== newListId
      );
      // Update old list cardIndex
      oldListCards.forEach((c) => {
        if (c.cardIndex > oldCardIndex) {
          c.cardIndex -= 1;
          return c;
        } else if (c.cardIndex === oldCardIndex) {
          c.list = newListId;
          return c;
        } else {
          return c;
        }
      });
      // Update new list cardIndex
      newListCards.forEach((c) => {
        if (c.cardIndex >= newCardIndex) {
          c.cardIndex += 1;
          return c;
        } else {
          return c;
        }
      });
      return [...oldListCards, ...newListCards, ...remainingCards];
    }
    default:
      return state;
  }
};

export default cardReducer;
