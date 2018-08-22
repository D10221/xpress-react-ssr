import args from "./args";
import { hostname } from "os";
import { ServerOptions } from "https";
import { isAbsolute, join } from "path";
export const protocol =
  ((args.protocol || process.env.PROTOCOL) === "https" && "https") || "http";
export const port = Number(args.port || process.env.PORT) || 5000;
export const host = args.host || process.env.HOST || null; // IPv6/4
export const hostName = args.hostName || host || hostname();
export const authSecret = process.env.AUTH_SECRET || ""; // fs.readFileSync('/path/to/public.pub')
// TODO
const _1HOUR = 60 * 60;
export const JWT_EXP_IN_SECONDS = _1HOUR;
/** TODO */
export const secureOptions: ServerOptions = {
  cert: undefined,
  passphrase: undefined
  // ...
};
const { PUBLIC_PATH } = process.env;
if (typeof PUBLIC_PATH !== "string") {
  throw new Error("PUBLIC_PATH not set");
}
export const publicPath = isAbsolute(PUBLIC_PATH)
  ? PUBLIC_PATH
  : join(process.env.CWD || process.cwd(), PUBLIC_PATH);
console.log("Public Path: %s", publicPath);
