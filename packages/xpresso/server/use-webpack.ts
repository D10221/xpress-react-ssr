import { Express } from "express-serve-static-core";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
/** */
export function useWebpack(app: Express) {
  const config: webpack.Configuration = require("../webpack.config");
  const compiler = webpack(config);  
  app.use(webpackDevMiddleware(compiler, {
    logLevel: 'info',
    publicPath: process.env.PUBLIC_PATH || "/"
  }));
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true,
      log: console.log,
      // heartbeat: 10 * 1000
    })
  );
}
