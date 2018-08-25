import express, { json } from "express";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import { staticPath } from "./config";
import ErrorHandler from "./error-handler";
import { renderPage } from "./views";
const isDev = process.env.NODE_ENV !== "production";
/**
 * TODO:
 */
export default (app: Express) =>
  new Promise<Express>(async (resolve, reject) => {
    try {
      if (isDev) (await import("./use-webpack")).useWebpack(app);
      // ...
      app.use("/static", express.static(staticPath));
      // ...
      app.use(json());
      // ...
      app.use(
        auth.middleware.unless({
          path: ["/login", isDev && "/__webpack_hmr"]
        })
      );
      // ...
      app.get("/login", renderPage("login"));
      app.post("/login", auth.loginHandler);
      // ...
      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      // ...
      app.get("/", renderPage("app"));
      app.use(ErrorHandler());
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
