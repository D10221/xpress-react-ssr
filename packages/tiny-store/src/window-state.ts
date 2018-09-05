import { Reducer } from "redux";

export const STORE_KEY = "@window-state";

const SET_STATE = `${STORE_KEY}/set-state`;

export const actionTypes = {
  SET_STATE
};

const setState = (payload: {}) => ({
  type: SET_STATE,
  payload,
  meta: undefined
});

export const actions = {
  setState
};

const $STATE: {} =
  (typeof window !== "undefined" &&
    !!(window as any).$STATE &&
    (window as any).$STATE) ||
  {};

export const reducer: Reducer = (state = $STATE, action) => {
  switch (action.type) {
    case SET_STATE: {
      const { payload } = action;
      return { ...state, payload };
    }
  }
};

export const selector = (state: { [key: string]: any }): {} => {
  return state[STORE_KEY];
};
