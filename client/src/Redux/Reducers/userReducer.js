import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE,
} from "../Constaints/userCons";
import Store from "../Store";
const initialState = {
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || null,
  isFetching: false,
  error: false,
};
console.log(Store?.getState());
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
    case USER_UPDATE:
      return {
        userInfo: action.payload,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};
