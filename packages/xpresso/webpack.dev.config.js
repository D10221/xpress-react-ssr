console.log("Webpack DEV Config");
const webpack = require("webpack");
const path = require("path");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const commonConfig = require("./webpack.common.config");
/**
 * Append hotMiddlewareScript to entries
 */
const hotMiddlewareScript =
    "webpack-hot-middleware/client?path=/__webpack_hmr";
for (const key of Object.keys(commonConfig.entry)) {
  commonConfig.entry[key] = commonConfig.entry[key].concat(hotMiddlewareScript);
}
/** 
 * @description Webpack configuration 
 * @type {import("webpack").Configuration} 
 * */
module.exports = {
  ...commonConfig,
  mode: "development",
  devtool: "#source-map",  
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin() || undefined,
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackPwaManifest({
      filename: "manifest.json",
      short_name: "xpresso",
      name: "xpresso",
      icons: [
        {
          src: path.resolve(__dirname, "public", "favicon.ico"),
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/x-icon"
        }
      ],
      start_url: "./",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff"
    }),
    // new CopyWebpackPlugin([
    //   // relative path is from src
    //   { from: "../../xyz.zzz" }, // <- your path to favicon
    // ])
  ],
};
