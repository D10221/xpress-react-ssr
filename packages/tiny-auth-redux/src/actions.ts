import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";;
/** */
const setBusy = (payload: boolean): FluxStandardAction<boolean> => ({
    type: actionTypes.SET_BUSY,
    payload,
    meta: undefined
});
const setError = (payload: string | Error): FluxStandardAction<string | Error> => ({
    type: actionTypes.SET_ERROR,
    payload,
    meta: undefined
});
const setSuccess = (payload: boolean): FluxStandardAction<boolean> => ({
    type: actionTypes.SET_SUCCESS,
    payload,
    meta: undefined
});
const setToken = (payload: string): FluxStandardAction<string> => ({
    type: actionTypes.SET_TOKEN,
    payload,
    meta: undefined
});
const fetching = (payload?: { busy?: boolean; error?: string | Error; }): FluxStandardAction<{ busy?: boolean; error?: string | Error }> => ({
    type: actionTypes.FETCHING,
    payload,
    meta: undefined
});
const onSuccess = (payload: string): FluxStandardAction<string> => ({
    type: actionTypes.ON_SUCCESS,
    payload,
    meta: undefined
});

const fail = (payload: string | Error): FluxStandardAction<string | Error> => ({
    type: actionTypes.FAIL,
    payload,
    meta: undefined
});
/** middleware */
const login = (
    username: string,
    password: string
): FluxStandardAction<{ username: string; password: string }> => ({
    type: actionTypes.LOGIN,
    payload: {
        username,
        password
    },
    meta: undefined
});
const actions = {
    setBusy,
    setError,
    setSuccess,
    setToken,
    login,
    fail,
    fetching,
    onSuccess,

}
export type Actions = typeof actions;
export default actions;