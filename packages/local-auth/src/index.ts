import users, { User } from "@local/users";
import tokens from "./tokens";
import { Auth, redirectOnAuthError } from "@local/tiny-auth";
import { hostname } from "os";
const authSecret = process.env.AUTH_SECRET || "secret"; // fs.readFileSync('/path/to/public.pub')
// TODO:
const _1HOUR = 60 * 60;
const JwtExpInSeconds = _1HOUR;
const auth = Auth<User, keyof User>({
  hostName: process.env.HOST_NAME || hostname(),
  secret: authSecret,
  expInSeconds: JwtExpInSeconds,
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser: users.validate,
  profileIdKey: "username"
});
export default auth;
export { redirectOnAuthError };
