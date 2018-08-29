import thunk from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  compose
} from "redux";
/** */
const promiseMiddleware = require("redux-promise").default as Middleware;
/** */
export default function(reducers: {}, middleware: Middleware[] = []) {
  const actionContext = {};
  /**
   * dev-tools
   */
  const composeEnhancers =
    process.env.NODE_ENV === "production"
      ? compose
      : typeof window === "object" &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

  /** */
  const store = createStore(
    combineReducers({
      ...reducers
    }),
    composeEnhancers(applyMiddleware(
      thunk.withExtraArgument(actionContext),
      promiseMiddleware,
      ...middleware
    ) as any)
  );

  return store;
}
(module as any).hot && (module as any).hot.accept();
