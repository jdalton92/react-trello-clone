const initialState2 = { password: "password", email: "test@email.com" };

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payLoad;
    case "CLEAR_USER":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
