console.log("Webpack PROD Config");
const path = require("path");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const commonConfig = require("./webpack.common.config");
/** 
 * @description Webpack configuration 
 * @type {import("webpack").Configuration} 
 * */
module.exports = {
  ...commonConfig,
  mode: "production",  
  devtool: "#source-map",
};
