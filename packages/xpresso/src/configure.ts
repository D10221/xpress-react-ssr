import express, { json } from "express";
import { Express } from "express-serve-static-core";
import Auth from "./auth";
import { publicPath } from "./config";
import errorHandler from "./error-handler";
import render from "./render";
import users from "./users";
import tokens from "./tokens";

const auth = Auth({
  findToken: tokens.find,
  revokeToken: tokens.add,
  findUser: users.validate,
  userId: users.getId,
  ignorePaths: ["/auth/login"],
});

/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      app.use("/static", express.static(publicPath));
      app.use(json());
      app.use(auth.middleware);
      app.post("/auth//login", auth.loginHandler);
      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      app.get("/", render());
      app.use(errorHandler);
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
