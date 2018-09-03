/**
 * @type {import("webpack").Entry}
 */
module.exports = {
  admin: require.resolve("./admin"),
  home: require.resolve("./home"),
  login: require.resolve("./login"),
  logout: require.resolve("./logout")
};
