import users, { User } from "./users";
import tokens from "./tokens";
import Auth from "@local/tiny-auth";
import {  hostName, authSecret, JwtExpInSeconds } from "./config";

const auth = Auth<User, keyof User>({
  hostName,
  secret: authSecret,
  expInSeconds: JwtExpInSeconds,
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser: users.validate,
  profileIdKey: "username",
});

export default auth;