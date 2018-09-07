import { applyMiddleware, combineReducers, createStore, } from "redux";
import thunkMiddleware from "redux-thunk";
import * as circuits from "../api/circuits/store";
import * as session from "./session";

const isWindow = typeof window !== "undefined";

const reducer = combineReducers({
    [session.STORE_KEY]: session.reducer,
    [circuits.STORE_KEY]: circuits.reducer
});

const store = createStore(
    reducer,
    (isWindow && (window as any).REDUX_DATA) || {},
    applyMiddleware(
        thunkMiddleware,
        circuits.middleware
    )
);

/** */
export default store;
