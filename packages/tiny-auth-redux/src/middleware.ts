import actions, { LoginAction } from "./actions";
import actionTypes from "./action-types";
import { Middleware } from "redux";
/** */
const middleware: Middleware = store => next => async action => {
  try {
    switch (action.type) {
      case actionTypes.LOGIN: {
        try {
          store.dispatch(actions.fetching({ busy: true }));
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { payload, meta } = action as LoginAction;
          const url = (meta && meta.url) || window.location.pathname;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
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
          return store.dispatch(actions.onSuccess(token));
        } catch (error) {
          return store.dispatch(actions.fail(error));
        } finally {
          store.dispatch(actions.setBusy(false));
        }
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

export default middleware;
