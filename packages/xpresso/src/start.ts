import { Express } from "express-serve-static-core";
import { hostname } from "os";
import http from "http";
import https from "https";
/** */
export default (app: Express) => new Promise<Express>((resolve, reject) => {
    try {
        app.settings.protocol = process.env.PROTOCOL === "https" || "http";
        app.settings.port = Number(process.env.PORT) || 5000;
        const server = (
            process.env.PROTOCOL === "https"
                ? https.createServer({ cert: undefined }, app)
                : http.createServer(app)
        ).listen(app.settings.port, (error: Error) => {
            if (error) {
                console.error(error);
                return process.exit(-1);
            }
            return resolve(app);
        });
        app.settings.host = server.address();
        if (typeof app.settings.host !== "string") {
            app.settings.host = app.settings.host.address || hostname();
        }
    } catch (error) {
        return reject(error);
    }
})

