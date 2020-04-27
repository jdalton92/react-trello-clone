import cardService from "../services/card";

export const addCard = (cardText, listId) => {
  return async (dispatch) => {
    const newCard = await cardService.newCard({
      listId,
      cardText,
    });

    try {
      dispatch({
        type: "ADD_CARD",
        payload: {
          _id: newCard._id,
          cardText,
          listId,
          cardIndex: newCard.cardIndex,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const moveCard = (
  cardId,
  oldListId,
  newListId,
  oldCardIndex,
  newCardIndex
) => {
  return async (dispatch) => {
    cardService.updateCard({
      cardId,
      oldListId,
      newListId,
      oldCardIndex,
      newCardIndex,
      changeType: "moveCard",
    });

    try {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          cardId,
          oldListId,
          newListId,
          oldCardIndex,
          newCardIndex,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeCardText = (cardId, cardText) => {
  return async (dispatch) => {
    cardService.updateCard({
      cardId,
      cardText,
      changeType: "changeTitle",
    });

    try {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: { _id: cardId, cardText },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCard = (cardId, listId) => {
  return async (dispatch) => {
    cardService.deleteCard({
      cardId,
    });
    try {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId, listId },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
