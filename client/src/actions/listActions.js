import listService from "../services/list";

export const addList = (listTitle, boardId) => {
  return async (dispatch) => {
    try {
      const list = await listService.saveList({ listTitle, boardId });
      const { _id, listIndex } = list;

      dispatch({
        type: "ADD_LIST",
        payload: {
          _id,
          listTitle,
          listIndex,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeListTitle = (boardId, listId, listTitle) => {
  return async (dispatch) => {
    try {
      await listService.updateList({
        boardId,
        listId,
        listTitle,
        changeType: "changeTitle",
      });

      dispatch({
        type: "CHANGE_LIST_TITLE",
        payload: { listId, listTitle },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteList = (listId) => {
  return async (dispatch) => {
    try {
      await listService.deleteList(listId);

      dispatch({
        type: "DELETE_LIST",
        payload: { listId },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const moveList = (boardId, listId, oldListIndex, newListIndex) => {
  return async (dispatch) => {
    try {
      listService.updateList({
        boardId,
        listId,
        oldListIndex,
        newListIndex,
        changeType: "moveList",
      });

      dispatch({
        type: "MOVE_LIST",
        payload: {
          listId,
          oldListIndex,
          newListIndex,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
