import listService from "../services/list";

export const addList = (listTitle, boardId) => {
  return async (dispatch) => {
    try {
      const list = listService.saveList({ listTitle, boardId });

      dispatch({
        type: "ADD_LIST",
        payload: {
          listId: list._id,
          listTitle,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeListTitle = (listId, listTitle) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CHANGE_LIST_TITLE",
        payload: { listId, listTitle },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteList = (listId, cards) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId, cards },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const moveList = (oldListIndex, newListIndex) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "MOVE_LIST",
        payload: {
          oldListIndex,
          newListIndex,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
