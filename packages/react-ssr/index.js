const args =require("minimist")(process.argv.slice(2));
const { default: Log } = require("@local/tiny-log");
const log = Log(console.log.bind(console));
if(typeof args.mode === "string") {
    process.env.NODE_ENV = args.mode;
    log.warn("NODE_ENV:%s", process.env.NODE_ENV);
}
if(!!args.production){
    process.env.NODE_ENV = "production";
    log.warn("NODE_ENV:%s", process.env.NODE_ENV);
}
if (process.env.NODE_ENV !== "production") {
    require("./src");
} else {
    require("./dist");
}
