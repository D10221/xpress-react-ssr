const path = require("path");
/**
 * @description Typescript config
 * @type {{ compilerOptions: import("typescript").CompilerOptions}}
 */
const tsconfig = require("./pages/tsconfig.json");
const { compilerOptions } = tsconfig;
/** Server outDir, it works with pages/outDir but its missleading  */
const { outDir } = require("./tsconfig.json").compilerOptions;
/** env */
let { PUBLIC_PATH } = process.env;
PUBLIC_PATH = PUBLIC_PATH || "/";
/**
 * @description Webpack common configuration
 * @type {Partial<import("webpack").Configuration>}
 * */
const config = {
  context: __dirname,
  entry: {
    /** always array so we can add more  */
    app: [path.resolve(__dirname, "pages/app/index.tsx")],
    login: [path.resolve(__dirname, "pages/login/index.tsx")]
  },
  output: {
    path: path.resolve(__dirname, outDir, "static"),
    publicPath: PUBLIC_PATH,
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
  }
};

module.exports = config;
