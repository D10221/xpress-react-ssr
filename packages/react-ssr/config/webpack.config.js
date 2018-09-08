const args = require("minimist")(process.argv.slice(2));
if (typeof args.mode === "string") {
  process.env.NODE_ENV = args.mode;
  console.log("Override NODE_ENV: %s", process.env.NODE_ENV);
}
const isDev = process.env.NODE_ENV !== "production";

const { join, resolve } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * @param context {string}
 * @return {import("webpack").Configuration}
 */
module.exports = function(context) {
  const { compilerOptions } = require(join(
    context,
    `./tsconfig${!isDev ? ".prod" : ""}.json`
  ));

  const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: resolve(context, "public", "favicon.ico") }
    ]),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      filter: x => {
        return !/\.(d.ts|map)$/.test(x.path);
      }
    }),
    !isDev &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false
      }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      short_name: "xpresso",
      name: "xpresso",
      icons: [
        {
          src: resolve(context, "public", "favicon.ico"),
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

  return {
    mode: isDev ? "development" : "production",
    context: join(context, "src"),
    devtool: "source-map",
    entry: {
      app: "./client.tsx"
    },
    output: {
      path: resolve(context, "dist/public"),
      filename: "static/js/[name].js"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      modules: [resolve("./src"), "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              /**@type {import("ts-loader").Options} */
              options: {
                /**@type {import("typescript").CompilerOptions} */
                compilerOptions: {
                  ...compilerOptions,
                  target: "es5"
                  // typeRoots: ["src/*.d.ts"]
                }
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: plugins.filter(x => !!x),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    }
  };
};
