import webpack, { Configuration } from "webpack";
import webpackDevServer, {
  Configuration as DevServerConfiguration
} from "webpack-dev-server";
import { join } from "path";

var config: Configuration & {
  devServer: DevServerConfiguration;
} = require(join(__dirname, "..", "./webpack.config.js"));
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  ...config.devServer,  
});
server.listen(config.devServer.port||5001);
