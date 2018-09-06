import { applyMiddleware, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
/** */
export default function create(initialState?: {}): Store {
  return createStore(
    reducer,
    initialState || {},
    applyMiddleware(thunkMiddleware)
  );
}
