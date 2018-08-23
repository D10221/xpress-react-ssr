import { Express } from "express-serve-static-core";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
const compiler = webpack(require("../webpack.config"));

export default async function (app: Express) {

  console.log(`webpack.compiler.output: %s`, JSON.stringify(compiler.options.output));
  if (!compiler.options.output) throw new Error("No Compiler Output");
  const publicPath = compiler.options.output.publicPath;
  if (!publicPath) { throw new Error("No Public Path") };
  // 
  app.use(webpackDevMiddleware(compiler, {
    // serverSideRender: true,    
    logLevel: 'info',
    publicPath,
    writeToDisk: true
  }));
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true,      
      log: console.log,
      // path: publicPath
      // heartbeat: 10 * 1000
    })
  );
}
