import { ServerOptions } from "https";
import { hostname } from "os";
import args from "./args";
import { join } from "path";
export const protocol =
  ((args.protocol || process.env.PROTOCOL) === "https" && "https") || "http";
export const port = Number(args.port || process.env.PORT) || 5000;
export const host = args.host || process.env.HOST || null; // IPv6/4
export const hostName = args.hostName || host || hostname();
export const authSecret = process.env.AUTH_SECRET || ""; // fs.readFileSync('/path/to/public.pub')
// TODO
const _1HOUR = 60 * 60;
export const JwtExpInSeconds = _1HOUR;
/** TODO */
export const secureOptions: ServerOptions = {
  cert: undefined,
  passphrase: undefined
  // ...
};
export const staticPath = join(__dirname, "static");