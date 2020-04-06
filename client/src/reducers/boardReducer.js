const boardReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case "ADD_BOARD": {
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    }
    case "DELETE_BOARD": {
      const { listId } = action.payload;
      const filterDeleted = (tmpListId) => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    default:
      return state;
  }
};

export default boardReducer;
