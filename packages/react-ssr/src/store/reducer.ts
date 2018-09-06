import * as session from "./session";
import * as data from "./data";
import { combineReducers } from "redux";

const reducer = combineReducers({
  [session.STORE_KEY]: session.reducer,
  [data.STORE_KEY]: data.reducer
});

export default reducer;
