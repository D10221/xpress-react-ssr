import express, { json } from "express";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import { publicPath } from "./config";
import errorHandler from "./error-handler";
import { renderPage } from "./views";
const isDev = process.env.NODE_ENV !== "production";
import useWebpack from "./use-webpack";
/** */
export default (app: Express) =>
  new Promise<Express>(async (resolve, reject) => {
    try {
      app.use("/static", express.static(publicPath));
      // ...
      if (isDev) await useWebpack(app);
      // ...
      app.use(json());
      app.use(auth.middleware.unless({
        path: ["/login", "/__webpack_hmr"]
      }));
      app.get("/login", renderPage("login"));
      app.post("/login", auth.loginHandler);

      app.post("/auth/logout", auth.logoutHandler);
      app.post("/auth/refresh", auth.refreshHandler);
      app.get("/", renderPage("app"));
      app.use(errorHandler);
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
