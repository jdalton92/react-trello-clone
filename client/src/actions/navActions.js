export const toggleMenu = () => {
  return dispatch => {
    dispatch({
      type: "TOGGLE_MENU"
    });
  };
};

export const setHeader = header => {
  return dispatch => {
    dispatch({
      type: "SET_HEADER",
      payLoad: { header }
    });
  };
};

export const setLogin = view => {
  return dispatch => {
    dispatch({
      type: "SET_LOGIN",
      payLoad: { view }
    });
  };
};

export const setFetching = isFetching => {
  return dispatch => {
    dispatch({
      type: "SET_LOADING",
      payLoad: { isFetching }
    });
  };
};
