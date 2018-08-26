/**
 * @type {import("webpack").Configuration}
 */
module.exports = require("@local/handbag/config")({
  cwd: __dirname,
  pages: {
    app: "pages/app/index.tsx",
    login: "pages/login/index.tsx"
  }
});
