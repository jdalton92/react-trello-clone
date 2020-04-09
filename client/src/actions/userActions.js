import loginService from "../services/login";
import { setToken, destroyToken } from "../utils/tokenHelper";
import userService from "../services/user";

export const initUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");

      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setToken(user.token);

        dispatch({
          type: "SET_USER",
          payload: { user },
        });
      }
    } catch (e) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: e.response.data.error, type: "error" },
      });
    }
  };
};

export const trialUser = () => {
  return (dispatch) => {
    const user = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWQiOiI1ZTgwMzY5Y2QzYTQ5OTE2MzA1MmRmMDkiLCJpYXQiOjE1ODYzMjc3Njh9.IkFCezMULWg213ejFOfTD1GCkxC6d2ZgiI0gi2I94Ek",
      email: "test@email.com",
      id: "5e80369cd3a499163052df09",
    };

    setToken(user.token);

    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    dispatch({
      type: "SET_USER",
      payload: {
        user,
      },
    });
  };
};

export const createUser = ({ email, password, checkPassword }) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      await userService.create({
        email,
        password,
        checkPassword,
      });

      const user = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setToken(user.token);

      dispatch({
        type: "SET_USER",
        payload: { user },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "account created", type: "success" },
      });
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    destroyToken();
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "CLEAR_USER",
    });
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      const user = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setToken(user.token);

      dispatch({
        type: "SET_USER",
        payload: user,
      });

      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: e.response.data.error, type: "error" },
      });
    }
  };
};

export const updateUser = (
  newEmail,
  oldPassword,
  newPassword,
  confirmNewPassword,
  id
) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      const user = await userService.update(
        newEmail,
        oldPassword,
        newPassword,
        confirmNewPassword,
        id
      );

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      destroyToken();
      setToken(user.token);

      dispatch({
        type: "SET_USER",
        payload: { user },
      });
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: e.response.data.error, type: "error" },
      });
    }
  };
};

export const deleteUser = (password, id) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: { isFetching: true },
    });
    try {
      await userService.deleteUser(password, id);

      window.localStorage.removeItem("loggedUser");
      destroyToken();

      dispatch({
        type: "CLEAR_USER",
      });
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payload: { isFetching: false },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: e.response.data.error, type: "error" },
      });
    }
  };
};
