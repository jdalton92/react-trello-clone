import loginService from "../services/login";
import { setToken, destroyToken } from "../utils/tokenHelper";
import userService from "../services/user";

export const initUser = () => {
  return async dispatch => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");

      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setToken(user.token);

        dispatch({
          type: "SET_USER",
          data: user
        });
      }
    } catch (e) {
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "error"
        }
      });
    }
  };
};

export const createUser = ({ email, password, checkPassword }) => {
  return async dispatch => {
    dispatch({
      type: "SET_LOADING",
      payLoad: { isFetching: true }
    });
    try {
      await userService.create({
        email,
        password,
        checkPassword
      });

      const user = await loginService.login({
        email,
        password
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setToken(user.token);

      dispatch({
        type: "SET_USER",
        data: user
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: "Account Created",
          type: "success"
        }
      });
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });

      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "error"
        }
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    destroyToken();
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "CLEAR_USER"
    });
  };
};

export const loginUser = ({ email, password }) => {
  return async dispatch => {
    dispatch({
      type: "SET_LOADING",
      payLoad: { isFetching: true }
    });
    try {
      const user = await loginService.login({
        email,
        password
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setToken(user.token);

      dispatch({
        type: "SET_USER",
        payLoad: { user }
      });

      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });

      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: "wrong username or password",
          type: "error"
        }
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
  return async dispatch => {
    dispatch({
      type: "SET_LOADING",
      payLoad: { isFetching: true }
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
        data: user
      });
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "error"
        }
      });
    }
  };
};

export const deleteUser = (password, id) => {
  return async dispatch => {
    dispatch({
      type: "SET_LOADING",
      payLoad: { isFetching: true }
    });
    try {
      await userService.deleteUser(password, id);

      window.localStorage.removeItem("loggedUser");
      destroyToken();

      dispatch({
        type: "CLEAR_USER"
      });
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
    } catch (e) {
      dispatch({
        type: "SET_LOADING",
        payLoad: { isFetching: false }
      });
      dispatch({
        type: "SET_NOTIFICATION",
        content: {
          message: e.response.data.error,
          type: "error"
        }
      });
    }
  };
};
