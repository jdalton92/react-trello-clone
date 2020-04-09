const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      const { user } = action.payload;
      return user;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export default userReducer;
