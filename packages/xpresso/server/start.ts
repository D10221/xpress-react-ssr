import { Express } from "express-serve-static-core";
import http from "http";
import https from "https";
import { host, port, protocol, secureOptions } from "./config";
/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      const server = (protocol === "https"
        ? https.createServer(secureOptions, app)
        : http.createServer(app)
      );
      server.listen(port, host, (error: Error) => {
        if (error) return reject(error);
        return resolve(app);
      });
    } catch (error) {
      return reject(error);
    }
  });
