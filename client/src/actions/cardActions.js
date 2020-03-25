export const addCard = (cardText, cardId, listId) => {
  return async dispatch => {
    try {
      dispatch({
        type: "ADD_CARD",
        payload: { cardText, cardId, listId }
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
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId,
          destListId,
          oldCardIndex,
          newCardIndex
        }
      });
    } catch (e) {
      console.log(e);
      //   dispatch({
      //     type: "LIST_REQUEST_FAIL"
      //   });
      //   dispatch({
      //     type: "SET_NOTIFICATION",
      //     content: {
      //       message: e.response.data.error,
      //       type: "danger"
      //     }
      //   });
    }
  };
};

export const changeCardText = (cardId, cardText) => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: { cardId, cardText }
      });
    } catch (e) {
      console.log(e);
      //   dispatch({
      //     type: "LIST_REQUEST_FAIL"
      //   });
      //   dispatch({
      //     type: "SET_NOTIFICATION",
      //     content: {
      //       message: e.response.data.error,
      //       type: "danger"
      //     }
      //   });
    }
  };
};

export const deleteCard = (cardId, listId) => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId, listId }
      });
    } catch (e) {
      console.log(e);
      //   dispatch({
      //     type: "LIST_REQUEST_FAIL"
      //   });
      //   dispatch({
      //     type: "SET_NOTIFICATION",
      //     content: {
      //       message: e.response.data.error,
      //       type: "danger"
      //     }
      //   });
    }
  };
};
