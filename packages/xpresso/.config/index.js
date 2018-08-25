const minimist = require("minimist");
const args = minimist(process.argv.slice(2));
const { warn } = require("./log")(console.log.bind(console));

process.env.PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
/**
 * @description Webpack common configuration
 * @returns {Partial<import("webpack").Configuration>}
 * */
module.exports = () => {

  const cwd = process.cwd();
  const mode = args.mode || "development";  
  
  if (process.env.NODE_ENV === "production" && mode === "development") {
    warn("*** \n* Warning: NODE_ENV: '%s' !== webpack.mode: '%s' \n***",
      process.env.NODE_ENV,
      mode
    );
  }
  
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
