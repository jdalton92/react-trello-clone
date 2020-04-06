export const addCard = (boardName, boardDescription) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ADD_BOARD",
        payload: { boardName, boardDescription },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteBoard = (boardId) => {
  return async (dispatch) => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "DELETE_CARD",
        payload: { boardId },
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
