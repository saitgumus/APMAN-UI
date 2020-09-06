import * as actionTypes from "./action-types";
import { CommonTypes } from "../../Types/Common";
import Axios from "axios";

export function LoginSuccess(userContract) {
  return {
    type: actionTypes.LOGIN,
    payload: userContract,
  };
}

export function ChangeLoginStatusSuccess(token, expiration, isSuccess) {
  return {
    type: actionTypes.CHANGE_LOGIN_STATUS,
    payload: {
      token,
      expiration,
      isSuccess,
    },
  };
}

export function ChangeLoginStatus(jwtObject) {
  return function (dispatch) {
    dispatch(
      ChangeLoginStatusSuccess(
        jwtObject.token,
        jwtObject.expiration,
        jwtObject.isSuccess
      )
    );
  };
}

export function Login(user) {
  return function (dispatch) {
    let url = CommonTypes.GetUrlForAPI("user", "login");
    return Axios.post(url, user)
      .then((res) => {
        if (res.data && res.data.token) {
          dispatch(LoginSuccess(res.data));
        } else {
          dispatch(LoginSuccess({ token: "null", expiration: new Date() }));
        }
      })
      .catch((e) => console.log(e));
  };
}
