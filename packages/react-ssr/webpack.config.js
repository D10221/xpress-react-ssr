const args = require("minimist")(process.argv.slice(2));
if (typeof args.mode === "string") {
    process.env.NODE_ENV = args.mode;
    console.log("Override NODE_ENV: %s", process.env.NODE_ENV)
}
const isDev = process.env.NODE_ENV !== "production";

const { join, resolve } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const { compilerOptions } = require(join(
    __dirname,
    `./tsconfig${!isDev ? ".prod" : ""}.json`
));

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([{ from: resolve(__dirname, "data") }]),
    new ManifestPlugin({
        fileName: "asset-manifest.json",
        filter: x => {
            return !/\.(d.ts|map)$/.test(x.path);
        }
    }),
    !isDev && new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    })
];

module.exports = {
    mode: isDev ? "development" : "production",
    context: join(__dirname, "src"),
    devtool: "source-map",
    entry: {
        app: "./client.tsx",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        modules: [
            resolve("./src"),
            "node_modules",
        ],
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
        ],
    },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    plugins: plugins.filter(x => !!x),
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    }
};
