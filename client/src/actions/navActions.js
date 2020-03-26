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
      payload: { header }
    });
  };
};
