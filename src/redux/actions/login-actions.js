import * as actionTypes from "./action-types";
import Action from "../../Models/ActionContract";

export function Login(userContract) {
  return {
    type: actionTypes.LOGIN,
    payload: userContract,
  };
}

export function Signin(userContract) {
  return new Action(actionTypes.REGISTER, userContract);
}
