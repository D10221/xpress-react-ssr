const path = require("path");
const { compilerOptions } = require("./pages/tsconfig.json");
/** 
 * @description Webpack common configuration 
 * @type {Partial<import("webpack").Configuration>} 
 * */
const config = {
    context: __dirname,
    entry: {
        /** always array so we can add more  */
        app: [path.resolve(__dirname, "pages/app/index.tsx"),],
        login: [path.resolve(__dirname, "pages/login/index.tsx")]
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
};


module.exports = config;