import { Reducer, Action } from "redux";
import { Request } from "express";

export const STORE_KEY = "$SESSION";

export const actionTypes = {
  INITIALIZE: `${STORE_KEY}/INITIALIZE`
};

type InitializeAction = Action<typeof actionTypes.INITIALIZE> & {
  payload: Request;
};

export const initialize = (payload: Request): InitializeAction => ({
  type: actionTypes.INITIALIZE,
  payload
});

const defaultState = {
  loggedIn: false,
  user: undefined as {} | null | undefined
};

export type State = typeof defaultState;

export const reducer: Reducer = (
  state: State = defaultState,
  action
): State => {
  switch (action.type) {
    case actionTypes.INITIALIZE: {
      const { payload } = action as InitializeAction;
      const { user } = payload;
      const { password, token, ...rest } = user || {
        password: undefined,
        token: undefined
      };
      return { loggedIn: !!user, user: rest };
    }
    default:
      return state;
  }
};

export const selector = (state: { [key: string]: any }): State => {
  return state[STORE_KEY];
};
