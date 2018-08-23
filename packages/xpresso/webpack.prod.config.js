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
  plugins: [   
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
      start_url: "./index.html",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff"

    })
  ],
};
