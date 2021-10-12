import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constaints/userCons";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  isFetching: false,
  error: false,
};
export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isFetching: true, error: false };

    case USER_LOGIN_SUCCESS:
      return { isFetching: false, userInfo: action.payload, error: false };

    case USER_LOGIN_FAIL:
      return { isFetching: false, error: true };

    case USER_LOGOUT:
      return {
        userInfo: null,
        error: false,
        isFetching: false,
      };

    default:
      return state;
  }
};
