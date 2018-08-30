import { Express } from "express-serve-static-core";
import args from "./args";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
const { PORT } = process.env;
/** */
export default function (app: Express): Promise<HttpServer | HttpsServer> {
    return new Promise((resolve, reject) => {
        const server = app.listen(Number.parseInt(args.port || PORT, 10) || 5000, (error: Error) => {
            if (error) {
                return reject(error);
            }
            resolve(server);
        });
    })
}