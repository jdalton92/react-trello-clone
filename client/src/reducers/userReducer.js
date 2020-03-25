const initialState = {
  isFetching: false,
  data: { username: "test-user", password: "password", email: "test@email.com" }
};

const initialState2 = {
  isFetching: false,
  data: { username: "", password: "", email: "" }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return { ...state, isFetching: true };
    case "USER_REQUEST_FAIL":
      return { ...state, isFetching: false };
    case "SET_USER":
      return {
        isFetching: false,
        data: action.data
      };
    case "CLEAR_USER":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
