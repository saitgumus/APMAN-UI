import { combineReducers } from "redux";
import loginReducer from "./login-reducer";
import cityReducer from "./city-county-reducer";
import countyReducer from "./county-reducer";
import parameterReducer from "./parameter-reducer";
import registerReducer from "./register-reducer";
import changeLoginStatusReducer from "./change-login-status-reducer";
import showMessageReducer from "./message-reducer";
import changeSelectedCityReducer from "./change-selected-city-reducer";

const rootReducer = combineReducers({
  loginReducer,
  cityReducer,
  countyReducer,
  parameterReducer,
  registerReducer,
  changeLoginStatusReducer,
  showMessageReducer,
  changeSelectedCityReducer,
});

export default rootReducer;
