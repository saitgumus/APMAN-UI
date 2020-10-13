import { CommonTypes } from "../../Types/Common";
import * as actionTypes from "./action-types";
//import LogMessage from "../../Services/Log";
//import Axios from "axios";
//import Cache from "../../Services/Cache";

//#region get actions

/**
 * aksiyon listesi getirilir.
 * @param {string} resourceCode ekran kodu
 */
export function changeActiveResourceCode(resourceCode) {
  let actionKeys = [];

  // LogMessage("test message");
  switch (resourceCode) {
    case CommonTypes.Resources.defineSiteApartment.resourceCode:
      actionKeys.push.apply(actionKeys, [CommonTypes.ActionKeys.Save]);
      break;
    default:
      break;
  }

  return function (dispatch) {
    dispatch(GetActionListSuccess(actionKeys, resourceCode));
  };
}

export function GetActionListSuccess(actionKeyList, resourceCode) {
  return {
    type: actionTypes.CHANGE_ACTION_LIST,
    payload: { actionKeyList, resourceCode },
  };
}

//#endregion

//#region execute action

/**
 * on execute action
 * @param {func} onExecute (key)
 */
export function executeCommand(onExecute) {
  return function (dispatch) {
    dispatch(executeSuccess(onExecute));
  };
}

export function executeSuccess(onExecute) {
  return {
    type: actionTypes.EXECUTE_ACTION,
    payload: {
      onExecute,
    },
  };
}

//#endregion
