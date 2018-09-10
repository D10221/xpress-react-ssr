import { applyMiddleware, combineReducers, createStore, compose, } from "redux";
import thunkMiddleware from "redux-thunk";
import * as circuits from "../api/circuits/store";
import * as session from "./session";

const isWindow = typeof window !== "undefined";

const reducer = combineReducers({
    [session.STORE_KEY]: session.reducer,
    [circuits.STORE_KEY]: circuits.reducer
});

/**
   * dev-tools
   */
const enhance =
    process.env.NODE_ENV === "production"
        ? compose
        : isWindow && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            })
            : compose;

const store = createStore(
    reducer,
    (isWindow && (window as any).REDUX_DATA) || {},
    enhance(applyMiddleware(
        thunkMiddleware,
        circuits.middleware
    ))
);

/** */
export default store;
