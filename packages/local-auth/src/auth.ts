import { User } from "@local/users";
import tokens from "./tokens";
import { Auth } from "@local/tiny-auth";
import { hostname } from "os";

const auth = Auth<User, keyof User>({
  hostName: process.env.HOST_NAME || hostname(),
  secret: process.env.AUTH_SECRET || "secret",
  expInSeconds: 60 * 60, // 1 Hour
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser: async (username: string, pwd: string) => {
    const many = await import("@local/users")
      .then(({ default: users }) => users)
      .then(users =>
        users.find(` id = '${username}'`, ({ password }) => password === pwd)
      );
    return many[0];
  },
  profileIdKey: "id"
});
export default auth;
