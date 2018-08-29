import { renderPage } from "@local/xpresso-views";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { Express } from "express-serve-static-core";
import { join } from "path";
import auth from "./auth";
import { redirectOnAuthError } from "@local/tiny-auth";
import PlainErrorHandler from "./plain-error-handler";
const isDev = process.env.NODE_ENV !== "production";
/**
 * TODO:
 */
export default (app: Express) =>
  new Promise<Express>(async (resolve, reject) => {
    try {
      if (isDev)
        (await import("@local/xpresso-middleware")).default(
          app,
          join(__dirname, "..", "webpack.config")
        );
      app.use(cookieParser());
      // ...
      app.use("/", express.static(join(__dirname, "public")));
      // ...
      app.get("/login", renderPage("login"));
      app.post("/login", [
        json(),
        auth.loginHandler,
        PlainErrorHandler()
      ]);
      app.get("/logout", [
        renderPage("logout"),
        //  can't rediretc to login
        // redirect to /, it will redirect to ?login
        redirectOnAuthError("/")
      ])
      app.post("/logout", [
        json(),
        auth.middleware,
        auth.logoutHandler
      ]);
      app.post("/auth/refresh", [
        auth.middleware,
        auth.refreshHandler,
        PlainErrorHandler()
      ]);
      app.get("/", [
        auth.middleware,
        renderPage("app"),
        redirectOnAuthError("/login")
      ]);
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
