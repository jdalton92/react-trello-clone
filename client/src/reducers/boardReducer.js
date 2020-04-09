const boardReducer = (
  state = { boards: [], activeBoard: { lists: [] } },
  action
) => {
  switch (action.type) {
    case "INIT_BOARDS": {
      const { boards } = action.payload;
      return { ...state, boards };
    }
    // case "GET_BOARD_DETAILS": {
    //   const { boardDetails } = action.payload;
    //   return { ...state, activeBoard: { ...boardDetails } };
    // }
    case "ADD_BOARD": {
      const { boardDetails } = action.payload;
      return {
        ...state,
        boards: [...state.boards, boardDetails],
      };
    }
    // case "CLEAR_BOARD": {
    //   return { ...state, activeBoard: {} };
    // }
    case "DELETE_BOARD": {
      const { boardId } = action.payload;
      const boards = state.boards.filter((b) => b._id !== boardId);
      return { ...state, boards };
    }
    default:
      return state;
  }
};

export default boardReducer;
