const listReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_LISTS": {
      const { lists } = action.payload;
      return lists;
    }
    case "ADD_LIST": {
      const { _id, listIndex, listTitle } = action.payload;
      return [...state, { _id, listIndex, listTitle, cards: [] }];
    }
    case "CHANGE_LIST_TITLE": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const newLists = state.filter((l) => l._id !== listId);
      return newLists;
    }
    case "MOVE_LIST": {
      const { listId, oldListIndex, newListIndex } = action.payload;
      const otherLists = state.filter((l) => l._id !== listId);
      const newList = state.filter((l) => l._id === listId);
      newList[0].listIndex = newListIndex;
      otherLists.forEach((l) => {
        if (l.listIndex >= newListIndex && l.listIndex < oldListIndex) {
          l.listIndex += 1;
          return l;
        } else if (l.listIndex > oldListIndex && l.listIndex <= newListIndex) {
          l.listIndex -= 1;
          return l;
        } else {
          return l;
        }
      });
      return [...otherLists, newList[0]];
    }
    default:
      return state;
  }
};

export default listReducer;
