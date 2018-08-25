const { resolve } = require("path")
/**
 * @param {{ mode: "development"|"production",  cwd: string } ;
 * @returns {import("webpack").RuleSetRule[]}
 */
module.exports = ({ mode, cwd }) => {
  /**
   * @description Typescript config
   * @type {{ compilerOptions: import("typescript").CompilerOptions}}
   */    
  const isDev = mode !== "production";
  const tsConfigJson = isDev ? "tsconfig.json" : "tsconfig.production.json";
  const { compilerOptions } = require(resolve(cwd, tsConfigJson));

  return [
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
  ];
};
