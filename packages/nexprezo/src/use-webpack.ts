import { Express } from "express-serve-static-core";
import { join } from "path";
const { PUBLIC_PATH, NODE_ENV } = process.env;
/** */
export default async function useWebpack(app: Express): Promise<Express> {

    if (NODE_ENV === "production") return app;

    try {
        const webpack = (await import("webpack")).default;
        const webpackDevMiddleware = (await import("webpack-dev-middleware")).default;
        const webpackHotMiddleware = (await import("webpack-hot-middleware")).default;
        const compiler = webpack(require(join(__dirname, "..", "webpack.config")));

        app.use(
            webpackDevMiddleware(compiler, {
                logLevel: "info",
                publicPath: PUBLIC_PATH || ""
            })
        );

        app.use(
            webpackHotMiddleware(compiler, {
                reload: true,
                log: console.log,
                heartbeat: 10 * 1000
            })
        );

        return app;
    } catch (error) {
        return Promise.reject(error);
    }
}