import { Dispatch, Reducer, Middleware } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import _fetch from "./fetch";

export const STORE_KEY = "circuits";

const actionTypes = {
    STORE_DATA: `${STORE_KEY}/store_data`,
    FETCH_DATA: `${STORE_KEY}/fetch-data`,
    FETCH_DATA_START: `${STORE_KEY}/fetch-data-start`,
};


type StoreDataAction = FluxStandardAction<{ data: any[]; error?: string | Error }>;
export const storeData = (data: any, error?: string | Error): StoreDataAction => ({
    type: actionTypes.STORE_DATA,
    payload: {
        data,
        error
    },
    meta: undefined
});

type FetchDataAction = FluxStandardAction<undefined>;
const fetchData = (): FetchDataAction => ({
    type: actionTypes.FETCH_DATA,
    payload: undefined,
    meta: undefined
});

type FetchDataStartAction = FluxStandardAction<undefined>;
const fetchDataStart = (): FetchDataStartAction => ({
    type: actionTypes.FETCH_DATA_START,
    payload: undefined,
    meta: undefined
});

export const actions = {
    fetchData
};

export type Actions = typeof actions;

export const bindActions = (dispatch: Dispatch): Actions => {
    return Object.keys(actions).reduce(
        (out, key) => {
            const action: (...args: any[]) => any = (actions as any)[key];
            out[key] = (...args: any[]) => dispatch(action(...args));
            return out;
        },
        {} as { [key: string]: any }
    ) as Actions;
};
export interface Circuit {
    circuitId: any;
    circuitName: any;
    Location: any
};
const defaultState = {
    data: [] as Circuit[],
    busy: false,
    error: undefined as (Error | string | undefined | null | false)
}

export type State = typeof defaultState;

export const selector = (state: { [key: string]: any }): State => {
    return state[STORE_KEY];
};

export const reducer: Reducer = (state: State = defaultState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_START: {
            return {
                ...state,
                busy: true,
                error: undefined,
                success: false
            };
        }
        case actionTypes.STORE_DATA: {
            const { payload } = (action as StoreDataAction);
            const { data, error } = payload || { data: [], error: undefined };
            return {
                ...state,
                data: data || [],
                busy: false,
                success: !!error,
                error: typeof error === "string" ? error : error && error.message ? error.message : error
            };
        }
        default: return state;
    }
};

export const middleware: Middleware = (_store) => {

    return dispatch => async action => {
        if (action.type === actionTypes.FETCH_DATA) {
            try {
                dispatch(fetchDataStart());
                if (typeof window !== "undefined") await new Promise(resolve => setTimeout(resolve, 2000));
                const data = await _fetch();
                return dispatch(storeData(data));
            } catch (error) {
                return dispatch(storeData(undefined, error));
            }
        }
        return dispatch(action);
    }
}