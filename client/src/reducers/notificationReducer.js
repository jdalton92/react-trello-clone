const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return [...state, action.payLoad];
    case "CLEAR_NOTIFICATION":
      return state.filter(n => n.id !== action.payLoad.id);
    default:
      return state;
  }
};

export default notificationReducer;
