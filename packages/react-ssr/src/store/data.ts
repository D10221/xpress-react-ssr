import { fetchCircuits } from "../api";
import { Dispatch, Reducer } from "redux";

export const STORE_KEY = "$PAGE_DATA";

const actionTypes = {
  STORE_DATA: `${STORE_KEY}/store_data`
};

export const storeData = (data: any) => ({
  type: actionTypes.STORE_DATA,
  data
});

export const fetchData = () => (dispatch: Dispatch) =>
  fetchCircuits().then(res => dispatch(storeData(res)));

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

const defaultState: any[] = [];

export type State = typeof defaultState;

export const selector = (state: { [key: string]: any }): State => {
  return state[STORE_KEY];
};

export const reducer: Reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.STORE_DATA:
      return action.data;
    default:
      return state;
  }
};
