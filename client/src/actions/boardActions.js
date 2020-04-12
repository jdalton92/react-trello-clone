import boardService from "../services/board";

export const initBoards = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      const boards = await boardService.getBoards();
      dispatch({
        type: "INIT_BOARDS",
        payload: { boards },
      });
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
      console.log(e);
    }
  };
};

export const getBoard = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      const { lists } = await boardService.getBoard(id);

      let cards = [];
      lists
        .filter((l) => l.cards.length)
        .forEach((l) => {
          cards = [...cards, ...l.cards];
        });

      dispatch({
        type: "INIT_LISTS",
        payload: { lists },
      });
      dispatch({
        type: "INIT_CARDS",
        payload: { cards },
      });
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
      console.log(e);
    }
  };
};

export const clearBoard = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CLEAR_BOARD",
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addBoard = (boardName, boardDescription) => {
  return async (dispatch) => {
    try {
      const boardDetails = await boardService.newBoard({
        boardName,
        boardDescription,
      });

      dispatch({
        type: "ADD_BOARD",
        payload: { boardDetails },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteBoard = (boardId) => {
  return async (dispatch) => {
    try {
      await boardService.deleteBoard(boardId);

      dispatch({
        type: "DELETE_BOARD",
        payload: { boardId },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
