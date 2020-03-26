const initialState = {
  header: "Boards",
  menuShrink: false
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU": {
      return { ...state, menuShrink: !state.menuShrink };
    }
    case "SET_HEADER": {
      const { header } = action.payload;
      return { ...state, header };
    }
    default:
      return state;
  }
};

export default navReducer;
