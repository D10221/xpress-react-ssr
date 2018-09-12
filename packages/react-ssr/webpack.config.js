require("ts-node/register");
const args = require("minimist")(process.argv.slice(2));

console.log("pid: ", process.pid);
/**
 * @type {import("webpack").Configuration}
 */
const config = require("./config/webpack.config")(__dirname);

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServer = {
  port: process.env.PORT || args.port || 5001,
  contentBase: config.output.path,
  after: async app => {
    const { default: configure } = require("./src/configure");
    await configure(app);
  }
};
console.log("dev-server port: %s", devServer.port);
config.devServer = devServer;
module.exports = config;
