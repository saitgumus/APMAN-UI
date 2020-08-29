import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function loginReducer(state = initialState.user, action) {
  switch (action) {
    case actionTypes.LOGIN:
      //login işlemleri
      return action.payload;

    case actionTypes.REGISTER:
      //register işlemleri
      return action.payload;
    default:
      return state;
  }
}
