/** */
module.exports = {
  Admin: require("./dist/admin"),
  Home: require("./dist/home"),
  Login: require("./dist/login"),
  Logout: require("./dist/logout"),
  /**
   * @type {import("webpack").Entry}
   */
  entry: {
    admin: require.resolve("./admin"),
    home: require.resolve("./home"),
    login: require.resolve("./login"),
    logout: require.resolve("./logout")
  }
};
