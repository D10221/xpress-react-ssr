import { Express } from "express-serve-static-core";
import http from "http";
import https, { ServerOptions } from "https";
import args from "./args";
import address from "./address";
const pkg = require("../package.json");
const host = args.host || process.env.HOST;
const protocol =
  ((args.protocol || process.env.PROTOCOL) === "https" && "https") || "http";
const port = Number(args.port || process.env.PORT) || 5000;
/** */
const secureOptions: ServerOptions = {
  cert: undefined,
  passphrase: undefined
  // ...
};
/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      const server =
        protocol === "https"
          ? https.createServer(secureOptions, app)
          : http.createServer(app);
      server.listen(port, host, (error: Error) => {
        if (error) return reject(error);
        console.log(
          "%s listening on %s, pid: %s",
          pkg.name,
          address(server.address()),
          process.pid
        );
        return resolve(app);
      });
    } catch (error) {
      return reject(error);
    }
  });
