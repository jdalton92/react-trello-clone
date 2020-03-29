const initialState = {
  header: "Boards",
  loginView: "landing",
  menuShrink: false,
  isFetching: false
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU": {
      return { ...state, menuShrink: !state.menuShrink };
    }
    case "SET_HEADER": {
      const { header } = action.payLoad;
      return { ...state, header };
    }
    case "SET_LOGIN": {
      const { view } = action.payLoad;
      return { ...state, loginView: view };
    }
    case "SET_LOADING": {
      const { isFetching } = action.payLoad;
      return { ...state, isFetching };
    }
    default:
      return state;
  }
};

export default navReducer;
