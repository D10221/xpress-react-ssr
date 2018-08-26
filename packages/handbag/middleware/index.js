Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {import("express-serve-static-core").Express} app express-app
 * @param {string| {import("webpack").Configuration}} config  current-working-directory
 */
function useWebpack(app, config) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(
    typeof config === "string" ? require(config) : config
  );
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: "info",
      publicPath: process.env.PUBLIC_PATH || "/"
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true,
      log: console.log
      // heartbeat: 10 * 1000
    })
  );
}
exports.default = useWebpack;
