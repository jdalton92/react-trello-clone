import { v4 as uuid } from "uuid";

export const setNotification = ({ message, type }) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      payLoad: {
        message,
        type,
        id: uuid()
      }
    });
  };
};

export const clearNotification = id => {
  return dispatch => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
      payLoad: {
        id
      }
    });
  };
};
