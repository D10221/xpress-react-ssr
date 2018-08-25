const { resolve } = require("path");
/**
 *
 * @param {{cwd: string, mode: "development"|"production"}}
 * @returns {import("typescript").CompilerOptions}
 */
module.exports = ({ mode, cwd }) => {
  const isDev = mode !== "production";
  const tsConfigJson = isDev ? "tsconfig.json" : "tsconfig.production.json";
  return require(resolve(cwd, tsConfigJson)).compilerOptions;
};
