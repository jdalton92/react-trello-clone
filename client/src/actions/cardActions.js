export const addCard = (cardText, cardId, listId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ADD_CARD",
        payload: { cardText, cardId, listId },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const moveCard = (
  sourceListId,
  destListId,
  oldCardIndex,
  newCardIndex
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId,
          destListId,
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
    try {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: { cardId, cardText },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCard = (cardId, listId) => {
  return async (dispatch) => {
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
