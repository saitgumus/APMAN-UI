import { createStore } from "redux";
import rootReducer from "./index";

export default function configureReducer() {
  return createStore(rootReducer);
}
