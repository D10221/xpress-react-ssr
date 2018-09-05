import thunk from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  compose
} from "redux";
/** Don't import redux-promise @types it breaks Dispatch */
const promiseMiddleware = require("redux-promise").default as Middleware;
/** */
export default function(
  reducers: {},
  middleware: Middleware[] = [],
  actionContext?: {}
) {
  actionContext = actionContext || {};
  const isWindow = typeof window === "object";
  /**
   * dev-tools
   */
  const enhance =
    process.env.NODE_ENV === "production"
      ? compose
      : isWindow && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

  /** */
  const store = createStore(
    combineReducers({
      ...reducers
    }),
    enhance(applyMiddleware(
      thunk.withExtraArgument(actionContext),
      promiseMiddleware,
      ...middleware
    ) as any)
  );
  return store;
}
