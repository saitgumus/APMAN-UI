import * as actionTypes from "./action-types";
import { CommonTypes } from "../../Types/Common";
//import Axios from "axios";
import { HttpClientServiceInstance } from "../../Services/HttpClient";
import User from "../../Models/User";
//import Log from "../../Services/Log";

/**
 * 
 * @param {User}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
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
    return HttpClientServiceInstance.post(url, user)
      .then((res) => {
        let data = res.data.user;

        user = new User();
        user.userId = data.userId;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.userName = data.userName;
        user.token = res.data.token.token;
        user.expiration = res.data.token.expiration;

        localStorage.setItem("user",JSON.stringify(user));
        HttpClientServiceInstance.setTokenOnLogin(user.token);
          dispatch(LoginSuccess(user));
          //test
          dispatch(ChangeLoginStatusSuccess(user.token,user.expiration,true))
      })
      .catch((e) => {
          debugger;
          if(e.response.status === 401){
              dispatch(ChangeLoginStatusSuccess("",new Date(),false))
          }
        dispatch(LoginSuccess(new User()));
      });
  };
}
