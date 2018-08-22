import express, { json } from "express";
import { Express } from "express-serve-static-core";
import Auth from "@local/tiny-auth";
import { publicPath, hostName, authSecret, JwtExpInSeconds } from "./config";
import errorHandler from "./error-handler";
import render from "./render";
import users, { User } from "./users";
import tokens from "./tokens";
import * as root from "./views/root";

const auth = Auth<User, keyof User>({
  hostName,
  secret: authSecret,
  expInSeconds: JwtExpInSeconds,
  isRevoked: tokens.exists,
  revokeToken: tokens.add,
  findUser: users.validate,
  profileIdKey: "username",
});
/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      app.use("/static", express.static(publicPath));
      app.use(json());
      app.use(auth.middleware.unless({
        path: ["/auth/login"]
      }));

      app.get("/auth/login", render(require("./views/login/view").default, require("./views/login/selector").default));
      app.post("/auth/login", auth.loginHandler);

      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      app.get("/", render(root.View, root.selector));
      app.use(errorHandler);
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
