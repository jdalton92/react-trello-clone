export const toggleMenu = () => {
  return dispatch => {
    dispatch({
      type: "TOGGLE_MENU"
    });
  };
};

export const setBoardModal = modalShow => {
  return dispatch => {
    dispatch({
      type: "SET_BOARD_MODAL",
      payLoad: { modalShow }
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
