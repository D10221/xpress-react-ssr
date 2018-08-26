const { resolve } = require("path");
/**
 *
 * @param {{cwd: string, mode: "development"|"production"}}
 */
module.exports = ({ mode, cwd }) => {
  const { outDir } = require("./compiler-options")({ mode, cwd });
  return {
    path: resolve(cwd, outDir, "public"),
    publicPath: process.env.PUBLIC_PATH,
    filename: "static/[name].js"
  };
};
