const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { compilerOptions } = require("./tsconfig.json");
/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  context: __dirname,
  entry: {
    app: resolve(__dirname, "app/index.tsx")
  },
  output: {
    path: join(__dirname, "build", "public"),
    filename: "static/app.js"
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
