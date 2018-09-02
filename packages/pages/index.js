const { resolve } = require("path");
/**
 * @type {import("webpack").Entry}
 */
const entry = {
  admin: resolve(__dirname, "admin/index.tsx"),
  home: resolve(__dirname, "home/index.tsx"),
  login: resolve(__dirname, "login/index.tsx"),
  logout: resolve(__dirname, "logout/index.tsx")
};

module.exports = {
    entry
};
