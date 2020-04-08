const initialState = {
  loginView: "landing",
  showBoardModal: false,
  menuShrink: true,
  isFetching: false,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU": {
      return { ...state, menuShrink: !state.menuShrink };
    }
    case "SET_BOARD_MODAL": {
      const { modalShow } = action.payload;
      return { ...state, showBoardModal: modalShow };
    }
    case "SET_LOGIN": {
      const { view } = action.payload;
      return { ...state, loginView: view };
    }
    case "SET_LOADING": {
      const { isFetching } = action.payload;
      return { ...state, isFetching };
    }
    default:
      return state;
  }
};

export default navReducer;
