
import actionTypes from "./action-types";
import { Reducer } from "redux";
import { ViewState } from "./types";
import { defaultState } from "./defaults";
import { FluxStandardAction } from "flux-standard-action";
import { getErrorMessage } from "./util";
/** */
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
        case actionTypes.ON_SUCCESS: {
            const { payload } = action as FluxStandardAction<string>;
            typeof window !== "undefined" && localStorage.setItem("token", payload || "");
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

export default reducer;