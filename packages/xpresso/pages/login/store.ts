import { Reducer } from "redux"
import { FluxStandardAction } from "flux-standard-action";
import ssr from "../ssr";
/** */
export interface ViewState {
    token: string,
    user: {},
    route: {
        path: string,
        query: {},
        params: {}
    },
    busy: false,
    error: undefined,
    authenticated: false,
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
}

export const STORE_KEY = "login";

export const actionTypes = {
    SET_TOKEN: `${STORE_KEY}/set-token`
}

export const actions = {
    setToken: (payload: string): FluxStandardAction<string> => ({
        type: actionTypes.SET_TOKEN,
        payload,
        meta: undefined
    })
}

export const reducer: Reducer = (state: ViewState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN: {
            const { payload } = action;
            localStorage.setItem("token", payload || "");
            return {
                ...state,
                token: payload
            }
        }
        default: return state;
    }
}

export const selector = (state: { [key: string]: any }) => state[STORE_KEY] as ViewState;
