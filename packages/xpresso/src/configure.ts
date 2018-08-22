import express, { json } from "express";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import { publicPath } from "./config";
import errorHandler from "./error-handler";
import render from "./render";
import * as App from "./views/app";
/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      app.use("/static", express.static(publicPath));
      app.use(json());
      app.use(auth.middleware.unless({
        path: ["/login"]
      }));

      app.get("/login", render(require("./views/login/view").default, require("./views/login/selector").default));
      app.post("/login", auth.loginHandler);

      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      app.get("/", render(App.View, App.selector));
      app.use(errorHandler);
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
