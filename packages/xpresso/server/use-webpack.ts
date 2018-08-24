import { Express } from "express-serve-static-core";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

export default function useWebpack(app: Express) {

  const config: webpack.Configuration = require("../webpack.config");
  const compiler = webpack(config);
  if (!config.output) throw new Error("No Compiler Output");
  const publicPath = config.output.publicPath;
  if (!publicPath) { throw new Error("No Public Path") };

  // 
  app.use(webpackDevMiddleware(compiler, {
    logLevel: 'info',
    publicPath,
    // writeToDisk: true
  }));
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true,
      log: console.log,
      // heartbeat: 10 * 1000
    })
  );
}
