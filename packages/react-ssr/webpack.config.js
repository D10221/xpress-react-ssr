require("ts-node/register");
console.log("process: ", process.pid);
/**
 * @type {import("webpack").Configuration}
 */
const config = require("./config/webpack.config")(__dirname);

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServer = {
    port: 5001,        
    contentBase: config.output.path,
    after: async (app)=>{
        const { default: configure } = require("./src/configure");
        await configure(app);
    }
}

config.devServer= devServer;
module.exports = config;