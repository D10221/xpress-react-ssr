import users, { User } from "@local/users-sql";
import tokens from "./tokens";
import { Auth } from "@local/tiny-auth";
import { hostname } from "os";
import Crypto from "@local/crypto";

const authSecret = process.env.AUTH_SECRET || "secret"; // fs.readFileSync('/path/to/public.pub')
// TODO:
const _1HOUR = 60 * 60;
const JwtExpInSeconds = _1HOUR;
const crypto = new Crypto({ password: "ABRACADABRA" });

async function findUser(username: string, pwd: string) {
  const many = (await users.find(
    ` id = '${username}'`,
    ({ password }) => password === pwd
  ));
  return many[0];
}


const auth = Auth<User, keyof User>({
  hostName: process.env.HOST_NAME || hostname(),
  secret: authSecret,
  expInSeconds: JwtExpInSeconds,
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser,
  profileIdKey: "id"
});
export default auth;

