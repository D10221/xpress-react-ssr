const { resolve } = require("path");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
/** PUBLIC_PATH */
process.env.PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
/**
 * @description Webpack common configuration
 * @returns {Partial<import("webpack").Configuration>}
 * */
module.exports = () => {
  const cwd = process.cwd();
  const mode = args.mode || "development";
  return {
    mode,
    context: __dirname,
    entry: require("./entry")({ mode, cwd }),
    output: require("./output")({ mode, cwd }),
    module: {
      rules: require("./rules")({ mode, cwd })
    },
    plugins: require("./plugins")({ mode, cwd }),
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"]
    }
  };
};
