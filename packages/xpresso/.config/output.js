const { resolve } = require("path");
/**
 *
 * @param {{cwd: string, mode: "development"|"production"}}
 */
module.exports = ({ mode, cwd }) => {
  const isDev = mode !== "production";
  const tsConfigJson = isDev ? "tsconfig.json" : "tsconfig.production.json";
  const { outDir } = require(resolve(cwd, tsConfigJson)).compilerOptions;
  return {
    path: resolve(cwd, outDir, "static"),
    publicPath: process.env.PUBLIC_PATH,
    filename: "[name].js"
  };
};
