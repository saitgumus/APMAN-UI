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

  debugger;
  // LogMessage("test message");
  switch (resourceCode) {
    case CommonTypes.Resources.defineSiteApartment.resourceCode:
      actionKeys.push.apply(actionKeys, [CommonTypes.ActionKeys.Save]);
      break;
    default:
      break;
  }

  return function (dispatch) {
    dispatch(GetActionListSuccess(actionKeys));
  };
}

export function GetActionListSuccess(actionKeyList) {
  return {
    type: actionTypes.CHANGE_ACTION_LIST,
    payload: actionKeyList,
  };
}

//#endregion

//#region execute command

/**
 * aksiyonu tetikler
 * @param {string} resourceCode ekran kaynak kodu
 * @param {string} actionKey aksiyon anahtarı
 */
export function executeCommand(resourceCode, actionKey) {
  return function (dispatch) {
    dispatch(executeSuccess(resourceCode, actionKey));
  };
}

/**
 * aksiyon alınma durumunda çalışır.
 * @param {page resource code} resourceCode kaynak kodu
 * @param {executed action key} actionKey aksiyon anahtarı
 */
export function executeSuccess(resourceCode, actionKey) {
  return {
    action: actionTypes.EXECUTE_ACTION,
    payload: {
      resourceCode,
      actionKey,
    },
  };
}

//#endregion
