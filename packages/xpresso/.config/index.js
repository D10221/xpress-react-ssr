const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const { warn } = require("./log")(console.log.bind(console));
/**
 * @description Webpack configuration
 * @param {{ cwd: string}}
 * @returns {Partial<import("webpack").Configuration>}
 * */
module.exports = ({ cwd }) => {
  const mode = args.mode || "development";

  if (process.env.NODE_ENV === "production" && mode === "development") {
    warn(
      "*** \n* Warning: NODE_ENV: '%s' !== webpack.mode: '%s' \n***",
      process.env.NODE_ENV,
      mode
    );
  }

  return {
    mode,
    context: cwd,
    entry: require("./entry")({ mode, cwd }),
    output: require("./output")({ mode, cwd }),
    module: {
      rules: require("./rules")({ mode, cwd })
    },
    plugins: require("./plugins")({ mode, cwd }),
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
};
