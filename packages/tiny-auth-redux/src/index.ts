import { Reducer, Middleware, Dispatch } from "redux";
import { FluxStandardAction } from "flux-standard-action";
/**locate in dev-tools :) */
process.env.NODE_ENV !== "production" && console.log("!");

export { STORE_KEY } from "./defaults";
export { default as actionTypes } from "./action-types";
export { default as actions, Actions } from "./actions";
export { default as bindActions } from "./bind-actions";
export { default as middleware } from "./middleware";
export { default as reducer } from "./reducer";
export { default as selector } from "./selector";
export * from "./types";