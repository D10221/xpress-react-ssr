/**
 * LOCAL config
 */
const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { compilerOptions } = require("./tsconfig.json");
const args = require("minimist")(process.argv.slice(2));
/** @type {import("@local/tiny-log")} */
const Log = require("@local/tiny-log").default;
const log = Log(console.log.bind(console));
/**
 * @type {import("webpack").Entry}
 */
const entry = {
  _dev_: resolve(__dirname, "_dev_/index.tsx"),
  ...require("./index").default
};

/**
 * @param {string} viewName
 * @returns {[ Function, {}]}
 */
const filter = viewName => [
  (out, key) => {
    if (viewName === key) {
      out[key] = entry[key];
    }
    return out;
  },
  {}
];

const keys = Object.keys(entry);
if (!args.view) {
  log.info(`
Usage: 
--view=${keys.join("|")}
`);
} else {
  log.info("Using --view:%s", args.view);
}
/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  context: __dirname,
  entry: !args.view ? entry : keys.reduce(...filter(args.view)),
  output: {
    path: join(__dirname, "build", "public"),
    filename: "static/[name].js"
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
            options: {
              compilerOptions
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.html")
    })
  ],
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
