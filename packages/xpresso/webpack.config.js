/**
 * @type {import("webpack").Configuration}
 */
module.exports = require("@local/xpresso-config")({
  cwd: __dirname,
  pages: {
    app: "../xpresso-pages/app/index.tsx",
    login: "../xpresso-pages/login/index.tsx",
    logout: "../xpresso-pages/logout/index.tsx"
  }
});
