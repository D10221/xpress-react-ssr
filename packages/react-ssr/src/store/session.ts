import { Reducer, Action } from "redux";
import { Request } from "express";

export const STORE_KEY = "$SESSION";

export const actionTypes = {
  INITIALIZE: `${STORE_KEY}/INITIALIZE`
};

type InitializeAction = Action<typeof actionTypes.INITIALIZE> & { payload: Request };

export const initialize = (payload: Request): InitializeAction => ({
  type: actionTypes.INITIALIZE,
  payload
});

const defaultState = { loggedIn: false };

export type State = typeof defaultState;

export const reducer: Reducer = (state: State = defaultState, action): State => {
  switch (action.type) {
    case actionTypes.INITIALIZE: {
      const { payload } = action as InitializeAction;
      return { loggedIn: !!payload.user };
    }
    default:
      return state;
  }
};

export const selector = (state: { [key: string]: any }): State => {
  return state[STORE_KEY];
};
