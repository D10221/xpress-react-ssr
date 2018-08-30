const webpack = require("webpack");
const { resolve } = require("path");
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require('copy-webpack-plugin')
/** */
const args = require("minimist")(process.argv.slice(2));
if (typeof args.mode === "string") {
    console.log("Override MODE: %s", args.mode);
    process.env.NODE_ENV = args.mode;
}
/** */
const isDev = process.env.NODE_ENV !== "production";
/** */
const mode = (isDev && "development") || "production";
console.log("webpack mode: %s", mode);
/** */
const { compilerOptions } = require(`./tsconfig${!isDev ? ".prod" : ""}.json`);
const { outDir } = compilerOptions;
const cwd = __dirname; // process.cwd();
/** */
const hotMiddlewareScript = "webpack-hot-middleware/client";
/**
 * @type {import("webpack").Configuration}
 */
const config = {
    mode,
    context: __dirname,
    entry: {
        "home": [
            resolve(__dirname, "src", "pages", "home", "index.tsx"),
            isDev && hotMiddlewareScript
        ].filter(x => !!x)
    },
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
                            compilerOptions: {
                                ...compilerOptions,
                                target: "es5"
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
            filter: (x) => {
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
                    src: resolve(cwd, "public", "favicon.ico"),
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
        new CopyWebpackPlugin([
            { from: resolve(__dirname, "public", "favicon.ico") }
        ]),
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
