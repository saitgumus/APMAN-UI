import * as actionTypes from "./action-types";

export function addBlockSuccess(block) {
  return {
    actionType: actionTypes.SAVE_NEW_BLOCK,
    payload: block,
  };
}

export function saveBlock(block) {
  return function (dispatch) {
    dispatch(addBlockSuccess(block));
  };
}
