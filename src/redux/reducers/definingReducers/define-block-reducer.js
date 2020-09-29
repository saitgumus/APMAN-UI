import * as actionTypes from "../../actions/action-types";
import initialState from "../initial-state";

export default function defineBlockReducer(state = initialState.block, action) {
  switch (action.type) {
    case actionTypes.SAVE_NEW_BLOCK:
      return action.payload;
    default:
      return state;
  }
}
