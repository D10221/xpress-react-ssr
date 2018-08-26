import { Reducer } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import ssr from "../ssr";
export const STORE_KEY = "app";
/** */
export interface ViewState {
  token: string;
  user: {};
  route: {
    path: string;
    query: {};
    params: {};
  };
  busy: false;
  error: undefined;
  authenticated: false;
}

function tryParse() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "") || {};
  } catch (error) {
    console.error(error);
    return {} as any;
  }
}

function trySave(payload: {}) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(payload) || "");
  } catch (error) {
    console.log(error);
  }
}

const defaultState: ViewState = {
  ...tryParse(),
  ...ssr()
};

export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-state`
};

export const actions = {
  setState: (
    payload: Partial<ViewState>
  ): FluxStandardAction<Partial<ViewState>> => ({
    type: actionTypes.SET_STATE,
    payload,
    meta: undefined
  })
};

export const reducer: Reducer = (state: ViewState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATE: {
      const { payload } = action;
      trySave(payload);
      return {
        ...state,
        ...payload,
        ...ssr()
      };
    }
    default:
      return state;
  }
};

export const selector = (state: { [key: string]: any }) =>
  state[STORE_KEY] as ViewState;
// no parent ?
(module as any).hot && (module as any).hot.accept();
