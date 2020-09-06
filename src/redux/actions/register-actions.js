import * as actionTypes from "./action-types";
import { CommonTypes } from "../../Types/Common";
import Axios from "axios";

export function registerUserSuccess(userData) {
  return {
    type: actionTypes.REGISTER,
    payload: userData,
  };
}

export function registerUser(user) {
  return function (dispatch) {
    let url = CommonTypes.GetUrlForAPI("user", "saveuser");
    return Axios.post(url, user).then((res) => {
      dispatch(registerUserSuccess(JSON.parse(JSON.stringify(res.data))));
    });
  };
}
