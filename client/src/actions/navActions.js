export const toggleMenu = () => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_MENU",
    });
  };
};

export const setBoardModal = (modalShow) => {
  return (dispatch) => {
    dispatch({
      type: "SET_BOARD_MODAL",
      payload: { modalShow },
    });
  };
};

export const setLogin = (view) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGIN",
      payload: { view },
    });
  };
};

export const setFetching = (isFetching) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching },
    });
  };
};
