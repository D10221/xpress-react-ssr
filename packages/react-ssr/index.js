if (process.env.NODE_ENV !== "production") {
    require("./src");
} else {
    require("./dist");
}
