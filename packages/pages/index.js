Object.defineProperty(exports, "__esModule", { value: true });
const { resolve } = require("path");
/** */
module.exports = {
  Admin: require("./admin"),
  Home: require("./home"),
  Login: require("./login"),
  Logout: require("./logout"),
  /**
   * @type {import("webpack").Entry}
   */
  default: {
    admin: resolve(__dirname, "admin/index.tsx"),
    home: resolve(__dirname, "home/index.tsx"),
    login: resolve(__dirname, "login/index.tsx"),
    logout: resolve(__dirname, "logout/index.tsx")
  }
};
