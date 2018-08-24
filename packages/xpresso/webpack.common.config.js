const WebpackPwaManifest = require('webpack-pwa-manifest')
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
    app: path.resolve(__dirname, "pages/app/index.tsx"),
    login: path.resolve(__dirname, "pages/login/index.tsx")
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
              compilerOptions
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
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
      start_url: "./",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff"
    })   
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};

module.exports = config;
