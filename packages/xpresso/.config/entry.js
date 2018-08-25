const { resolve } = require("path");
/**
 * @param {{ cwd: string, mode: "development"|"production" }
 * @returns {import("webpack").Entry}
 * */
module.exports = ({ cwd, mode }) => {
  const isDev = mode !== "production";
  let entry = {
    app: resolve(cwd, "pages/app/index.tsx"),
    login: resolve(cwd, "pages/login/index.tsx")
  };
  if (!isDev) return entry;
  /**
   * Append hotMiddlewareScript to entries
   */
  const hotMiddlewareScript = "webpack-hot-middleware/client";
  for (const key of Object.keys(entry)) {
    let value = entry[key];
    value = Array.isArray(value) ? value : [value];
    entry[key] = value.concat(hotMiddlewareScript);
  }
  return entry;
};
