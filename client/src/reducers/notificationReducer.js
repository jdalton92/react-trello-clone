const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [...state, action.payload];
    case "CLEAR_NOTIFICATION":
      return state.filter((n) => n.id !== action.payload.id);
    default:
      return state;
  }
};

export default notificationReducer;
