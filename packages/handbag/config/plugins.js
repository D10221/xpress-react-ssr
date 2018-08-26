const { resolve } = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");

/**
 * @param {{ mode: "development"|"production", cwd: string }} ;
 */
module.exports = ({ mode, cwd }) => {

  const { outDir } = require("./compiler-options")({ mode, cwd });

  const plugins = [
    new WebpackPwaManifest({
      filename: "manifest.json",
      short_name: "xpresso",
      name: "xpresso",
      icons: [
        {
          src: resolve(cwd, "public", "favicon.ico"),
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/x-icon"
        }
      ],
      start_url: "./",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff"
    })
  ];
  var ManifestPlugin = require('webpack-manifest-plugin');

  const isDev = mode !== "production";
  if (!isDev) {
    return [
      // new CleanWebpackPlugin([resolve(cwd, outDir)], {
      //   root: cwd
      // })
      new ManifestPlugin({
        fileName: "webpack-manifest.json",
        filter: (x)=> {
          return !/\.d.ts$/.test(x.path);
        }
      })
    ].concat(plugins);
  }
  return plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);
};
