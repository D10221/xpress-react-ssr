import { renderPage } from "@local/xpresso-views";
import express, { json } from "express";
import { Express } from "express-serve-static-core";
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
      app.use(json());
      // Auth
      app.use(
        auth.middleware.unless({
          path: ["/login", isDev && "/__webpack_hmr"]
        })
      );
      app.post("/login", auth.loginHandler);
      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      // Pages
      app.get("/login", renderPage("login"));
      app.get("/", renderPage("app"));

      app.use(ErrorHandler());
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
