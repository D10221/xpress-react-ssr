console.log("Webpack DEV Config");
const webpack = require("webpack");
const {plugins, ...commonConfig} = require("./webpack.common.config");
/**
 * Append hotMiddlewareScript to entries
 */
const hotMiddlewareScript =
    "webpack-hot-middleware/client";
for (const key of Object.keys(commonConfig.entry)) {
  let value = commonConfig.entry[key];
  value = Array.isArray(value) ? value : [value];
  commonConfig.entry[key] = value.concat(hotMiddlewareScript);
}
/** 
 * @description Webpack configuration 
 * @type {import("webpack").Configuration} 
 * */
module.exports = {
  ...commonConfig,
  mode: "development",
  devtool: "#source-map",  
  plugins: plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin() || undefined,
    new webpack.NoEmitOnErrorsPlugin(),
  ])
};
