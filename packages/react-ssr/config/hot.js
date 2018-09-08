const webpack = require("webpack");
const { resolve, join } = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const args = require("minimist")(process.argv.slice(2));
const env = require("dotenv");
const { dirname } = require("path");
const { readFileSync } = require("fs");
const logger = require("@local/tiny-log").default(console.log.bind(console));
/** */
if (typeof args.mode === "string") {
  if (process.env.NODE_ENV !== args.mode) {
    logger.warn("Override MODE: %s", args.mode);
    process.env.NODE_ENV = args.mode;
  }
}
/** */
const isDev = process.env.NODE_ENV !== "production";
/** */
const mode = (isDev && "development") || "production";
logger.info("webpack mode: %s", mode);
/** */
const cwd = __dirname;
/** */
const hotMiddlewareScript = "webpack-hot-middleware/client";
/**
 * PAGES is a Module Name
 */
const PAGES =
  args.pages ||
  process.env.PAGES ||
  env.parse(readFileSync(resolve(process.cwd(), ".env"))).PAGES;
/**
 * Point sub-repo from package name
 */
const context = dirname(require.resolve(PAGES));
logger.info("PAGES -> context: %s", context);
/**
 * let PAGES package "choose" tsconfig
 */
const { compilerOptions } = require(join(
  context,
  `./tsconfig${!isDev ? ".prod" : ""}.json`
));
const { outDir } = compilerOptions;
/**
 *
 * @param {import("webpack").Entry} entry
 * @return {import("webpack").Entry} entry
 */
function hot(entry) {
  if (!isDev) return entry;
  return Object.keys(entry).reduce((out, key) => {
    out[key] = [entry[key], hotMiddlewareScript];
    return out;
  }, {});
}
/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode,
  context,
  entry: hot(require(PAGES).default),
  output: {
    publicPath: process.env.PUBLIC_PATH,
    path: resolve(cwd, outDir, "public"),
    filename: "[name].js"
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
                // typeRoots: ["pages/*.d.ts"]
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      filter: x => {
        return !/\.d.ts$/.test(x.path);
      }
    }),
    isDev && new webpack.optimize.OccurrenceOrderPlugin(),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    }),
    isDev && new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{ from: resolve(context, "public", "favicon.ico") }])
    // new require("html-webpack-plugin")({ template: resolve(__dirname, "public", "index.html") }),
  ].filter(x => !!x),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
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
  }
};
module.exports = config;
