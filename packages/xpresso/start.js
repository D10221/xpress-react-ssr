const isDev = process.env.NODE_ENV !== "production";
if (isDev) {
  require("./build");
} else {
  require("./dist");
}
