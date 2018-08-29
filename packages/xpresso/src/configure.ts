import { renderPage } from "@local/xpresso-views";
import express, { json } from "express";
import { Express, RequestHandler } from "express-serve-static-core";
import { join } from "path";
import auth from "./auth";
import ErrorHandler from "./error-handler";
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
      // ...
      app.use("/", express.static(join(__dirname, "public")));
      // ...
      app.all("/login", [
        json(),
        ((req, res, next) => {
          console.log(req.method);
          if (req.method === "POST") {
            return auth.loginHandler(req, res, next);
          }
          if (req.method === "GET") {
            return renderPage("login")(req, res, next);
          }
          return next(new Error(`${req.method} /login Not Implemented`));
        }) as RequestHandler
      ]);
      app.all("/logout", [json(), auth.middleware, auth.logoutHandler]);
      app.post("/auth/refresh", [auth.middleware, auth.refreshHandler]);
      app.get("/", [auth.middleware, renderPage("app")]);

      app.use(ErrorHandler());
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
