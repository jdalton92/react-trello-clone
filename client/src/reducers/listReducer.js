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
    case "ADD_CARD": {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
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
    case "MOVE_CARD": {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId,
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }
    case "DELETE_CARD": {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    }
    default:
      return state;
  }
};

export default listReducer;
