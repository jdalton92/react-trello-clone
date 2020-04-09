const boardReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BOARDS": {
      const { boards } = action.payload;
      return boards;
    }
    case "ADD_BOARD": {
      const { boardDetails } = action.payload;
      return [...state, boardDetails];
    }
    case "DELETE_BOARD": {
      const { boardId } = action.payload;
      const boards = state.filter((b) => b._id !== boardId);
      return boards;
    }
    default:
      return state;
  }
};

export default boardReducer;
