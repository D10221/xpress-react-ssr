Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @type {import("webpack-dev-middleware").Options}
 */
const devMiddlewareOptions = {
  logLevel: "info",
  publicPath: process.env.PUBLIC_PATH
};
/**
 * @type {import("webpack-hot-middleware").Options}
 */
const hotMiddlewareOptions = {
  reload: true,
  log: console.log,
  heartbeat: 10 * 1000
};
/**
 *
 */
const defaultOptions = {
  devMiddlewareOptions,
  hotMiddlewareOptions
};
/**
 *
 * @param {import("express-serve-static-core").Express} app
 *  express-app
 * @param {string| {import("webpack").Configuration}} config
 *  Webpack config or requireable path to Webpackconfig
 * @param options {{ devMiddlewareOptions,  hotMiddlewareOptions }}
 */
function useWebpack(app, config, options = defaultOptions) {
  if (process.eventNames.NODE_ENV === "production") return app;

  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(
    typeof config === "string" ? require(config) : config
  );

  app.use(
    webpackDevMiddleware(compiler, {
      ...devMiddlewareOptions,
      ...((options || {}).devMiddlewareOptions || {})
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      ...hotMiddlewareOptions,
      ...((options | {}).hotMiddlewareOptions || {})
    })
  );

  return app;
}
exports.default = useWebpack;
