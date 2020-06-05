import storage from "utils/storage";
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  PUT_USER,
  PATCH_USER
} from "./actions";

const initialState = {
  accessToken: storage.get("accessToken")
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return { ...state, accessToken: null, user: null };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.token,
        user: action.payload
      };
    case PUT_USER:
      return { ...state, user: action.payload };
    case PATCH_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    default:
      return state;
  }
};

export default reducer;
