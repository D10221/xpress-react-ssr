import users, { User } from "./users";
import tokens from "./tokens";
import { Auth } from "@local/tiny-auth";
import args from "./args";
import { hostname } from "os";
const authSecret = process.env.AUTH_SECRET || ""; // fs.readFileSync('/path/to/public.pub')
// TODO:
const _1HOUR = 60 * 60;
const JwtExpInSeconds = _1HOUR;
/** */
const auth = Auth<User, keyof User>({
  hostName: args.hostName || hostname(),
  secret: authSecret,
  expInSeconds: JwtExpInSeconds,
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser: users.validate,
  profileIdKey: "username"
});

export default auth;
