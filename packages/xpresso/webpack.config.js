const webpack = require("webpack");
const path = require("path");
const hotMiddlewareScript =
  "webpack-hot-middleware/client?path=/__webpack_hmr";
const { compilerOptions } = require("./pages/tsconfig.json");
/** */
module.exports = {
  mode: "development",
  context: __dirname,
  devtool: "#source-map",
  entry: {
    app: [
      path.resolve(__dirname, "pages/app/index.tsx"),
      hotMiddlewareScript
    ],
    login: [
      path.resolve(__dirname, "pages/login/index.tsx"),
      hotMiddlewareScript
    ]
  },
  output: {
    path: path.resolve(__dirname, "static"),
    publicPath: "/static/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/i,
      //   use: ['url-loader']
      // },
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
              happyPackMode: true,
              compilerOptions
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
