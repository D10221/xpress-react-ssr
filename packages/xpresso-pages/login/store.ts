import { Reducer, Middleware, Dispatch } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import ssr from "../ssr";
console.log("!");
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

const dataSet = ssr();
const { user, route } = dataSet;

const defaultState: ViewState = {
  token: localStorage.getItem("token") || "",
  user,
  route,
  busy: false,
  error: undefined,
  authenticated: false
};

export const STORE_KEY = "login";

export const actionTypes = {
  SET_TOKEN: `${STORE_KEY}/set-token`,
  SET_ERROR: `${STORE_KEY}/set-error`,
  SET_BUSY: `${STORE_KEY}/set-busy`,
  SET_SUCCESS: `${STORE_KEY}/set-success`,
  /** */
  FETCHING: `${STORE_KEY}/fetching`,
  SUCCESS: `${STORE_KEY}/success`,
  FAIL: `${STORE_KEY}/fail`,
  /** midleware-actio-type */
  LOGIN: `${STORE_KEY}/login`,
  LOGOUT: `${STORE_KEY}/logout`
};

export const actions = {
  setBusy: (payload: boolean): FluxStandardAction<boolean> => ({
    type: actionTypes.SET_BUSY,
    payload,
    meta: undefined
  }),
  setError: (payload: string | Error): FluxStandardAction<string | Error> => ({
    type: actionTypes.SET_ERROR,
    payload,
    meta: undefined
  }),
  setSuccess: (payload: boolean): FluxStandardAction<boolean> => ({
    type: actionTypes.SET_SUCCESS,
    payload,
    meta: undefined
  }),
  setToken: (payload: string): FluxStandardAction<string> => ({
    type: actionTypes.SET_TOKEN,
    payload,
    meta: undefined
  }),
  /** */
  fetching: (payload?: {
    busy?: boolean;
    error?: string | Error;
  }): FluxStandardAction<{ busy?: boolean; error?: string | Error }> => ({
    type: actionTypes.FETCHING,
    payload,
    meta: undefined
  }),
  success: (payload: string): FluxStandardAction<string> => ({
    type: actionTypes.SUCCESS,
    payload,
    meta: undefined
  }),
  fail: (payload: string | Error): FluxStandardAction<string | Error> => ({
    type: actionTypes.FAIL,
    payload,
    meta: undefined
  }),
  /** middleware */
  login: (
    username: string,
    password: string
  ): FluxStandardAction<{ username: string; password: string }> => ({
    type: actionTypes.LOGIN,
    payload: {
      username,
      password
    },
    meta: undefined
  }),
  logout: () => ({})
};

export const reducer: Reducer = (state: ViewState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_BUSY: {
      const { payload } = action as FluxStandardAction<boolean>;
      return {
        ...state,
        busy: payload
      };
    }
    case actionTypes.SET_ERROR: {
      const { payload } = action as FluxStandardAction<string | Error>;
      const message = getErrorMessage(payload);
      return {
        ...state,
        error: message
      };
    }
    case actionTypes.SET_SUCCESS: {
      const { payload } = action as FluxStandardAction<boolean>;
      return {
        ...state,
        success: payload
      };
    }
    case actionTypes.FAIL: {
      const { payload } = action as FluxStandardAction<string | Error>;
      const message = getErrorMessage(payload);
      return {
        ...state,
        error: message || "FAIL",
        success: false
      };
    }
    case actionTypes.SET_TOKEN: {
      const { payload } = action as FluxStandardAction<string>;
      localStorage.setItem("token", payload || "");
      return {
        ...state,
        token: payload
      };
    }
    /** */
    case actionTypes.FETCHING: {
      const { payload } = action as FluxStandardAction<{
        busy?: boolean;
        error?: Error | string;
      }>;
      const { busy, error } = payload || { busy: false, error: undefined };
      return {
        ...state,
        error,
        success: false,
        busy: !!busy
      };
    }
    case actionTypes.SUCCESS: {
      const { payload } = action as FluxStandardAction<string>;
      localStorage.setItem("token", payload || "");
      return {
        ...state,
        token: payload,
        success: true
      };
    }
    default:
      return state;
  }
};

export const middleware: Middleware = store => next => async action => {
  try {
    switch (action.type) {
      case actionTypes.LOGIN: {
        try {
          store.dispatch(actions.fetching({ busy: true }));
          await new Promise(resolve => setTimeout(resolve, 1000));
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
          });
          if (!response.ok) {
            const contentType = response.headers.get("Content-Type") || "";
            if (/^text\/.*/.test(contentType)) {
              return store.dispatch(actions.fail(await response.text()));
            }
            if (/\/json$/.test(contentType)) {
              return store.dispatch(actions.fail(await response.json()));
            }
          }
          const { token } = await response.json();
          return store.dispatch(actions.success(token));
        } catch (error) {
          return store.dispatch(actions.fail(error));
        } finally {
          store.dispatch(actions.setBusy(false));
        }
      }
      case actionTypes.LOGOUT: {
        try {
        } catch (error) {}
      }
      default:
        return next(action);
    }
  } catch (error) {
    return next({
      type: typeof error,
      payload: error
    });
  }
};

export const selector = (state: { [key: string]: any }) => {
  return state[STORE_KEY] as ViewState;
};
// no parent ?
(module as any).hot && (module as any).hot.accept();

export type Actions = typeof actions;

export function bindActions(dispatch: Dispatch) {
  return Object.keys(actions).reduce(
    (out, key) => {
      out[key] = (...args: any[]) => dispatch((actions as any)[key](...args));
      return out;
    },
    {} as { [key: string]: any }
  ) as Actions;
}

function getErrorMessage(payload: string | Error | undefined) {
  return !payload
    ? payload
    : typeof payload === "string"
      ? payload
      : payload && payload.message
        ? payload.message
        : payload.toString();
}
