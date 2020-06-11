import urls from "utils/urls";
import request from "utils/request";
import storage from "utils/storage";
import { enqueueSnackbar } from "../../../components/notifier/NotifierActions";

export const AUTH_LOGIN_SUCCESS = "auth/AUTH_LOGIN_SUCCESS";
export const AUTH_LOGOUT = "auth/AUTH_LOGOUT";
export const PUT_USER = "auth/PUT_USER";
export const PATCH_USER = "auth/PATCH_USER";

export const patchUser = (payload) => {
  return {
    type: PATCH_USER,
    payload,
  };
};

export const authLoginSuccess = (payload) => {
  storage.set("accessToken", payload.token);

  return {
    type: AUTH_LOGIN_SUCCESS,
    payload,
  };
};

export const authLogin = (values) => (dispatch) => {
  return request
    .post(urls.signIn, values)
    .then(({ data }) => {
      if (data.status) {
        dispatch(authLoginSuccess(data.payload));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch((err) => {
      console.log({ err });
      const { response } = err;
      dispatch(
        enqueueSnackbar({
          message: response.data.payload && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};

export const authSignup = (values) => (dispatch) => {
  return request
    .post(urls.signUp, values)
    .then(({ data }) => {
      if (data.status) {
        dispatch(authLoginSuccess(data.payload));
        dispatch(
          enqueueSnackbar({
            message: "You are successfully registered! 🎉",
            options: { variant: "success" },
          })
        );
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response.data.payload && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};

export const authClearToken = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
export const authLogout = () => (dispatch) => {
  storage.remove("accessToken");
  // TODO: clear all storages here

  dispatch(authClearToken());
};
