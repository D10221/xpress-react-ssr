import { Express } from "express-serve-static-core";
import webpack from "webpack";
import { join } from "path";
const webpackConfigPath = join(__dirname, "..", "webpack.config");
console.log("webpackConfigPath: %s", webpackConfigPath);
const webpackConfig = require(webpackConfigPath);
const compiler = webpack(webpackConfig);

export default function(app: Express) {
  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(
    require("webpack-dev-middleware")(compiler, {
      logLevel: 'info', publicPath: webpackConfig.output.publicPath
    })
  );

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    })
  );
}
