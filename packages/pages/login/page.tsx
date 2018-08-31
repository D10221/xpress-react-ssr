import { middleware, reducer, STORE_KEY } from "@local/tiny-auth-redux";
import createStore from "@local/tiny-store";
import React from "react";
import { Provider } from "react-redux";
import Connected from "./connected";
const reducers = { [STORE_KEY]: reducer };
const store = createStore(reducers, [middleware]);
export default ()=> (<Provider store={store}><Connected /></Provider>)
