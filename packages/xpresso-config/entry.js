const { resolve } = require("path");
/**
 * @param {{ cwd: string, mode: "development"|"production", pages: { [key: string]: string } }
 * @returns {import("webpack").Entry}
 * */
module.exports = ({ cwd, mode, pages }) => {
  const isDev = mode !== "production";

  let entry = Object.keys(pages).reduce((out, key) => {
    out[key] = resolve(cwd, pages[key]);
    return out;
  }, {});

  if (!isDev) return entry;
  /**
   * Append hotMiddlewareScript to entries
   */
  return Object.keys(entry).reduce((out, key) => {
    out[key] = hot(entry[key]);
    return out;
  }, {});
};

const hotMiddlewareScript = "webpack-hot-middleware/client";

function hot(value) {
  return (Array.isArray(value) ? value : [value]).concat(hotMiddlewareScript);
}
