import shortid from "shortid";

export const addList = title => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    console.log("reducer title", title);
    try {
      dispatch({
        type: "ADD_LIST",
        payload: { listId: shortid.generate(), listTitle: title }
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

export const changeListTitle = (listId, title) => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "CHANGE_LIST_TITLE",
        payload: { listId, listTitle: title }
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

export const deleteList = (listId, cards) => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId, cards }
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

export const moveList = (oldListIndex, newListIndex) => {
  return async dispatch => {
    // dispatch({
    //   type: "LIST_REQUEST"
    // });
    try {
      dispatch({
        type: "MOVE_LIST",
        payload: {
          oldListIndex,
          newListIndex
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
