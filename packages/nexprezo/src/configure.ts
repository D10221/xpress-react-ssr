import { Express } from "express-serve-static-core";
import { static as serverStatic } from "express";
import { join } from "path";
import render from "./render";
import auth, { redirectOnAuthError } from "./auth";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import PlainErrorHandler from "./plain-error.handler";
/** */
export default async function configure(app: Express) {
  if (process.env.NODE_ENV !== "production") {
    const useWebpack = (await import("@local/dev-middleware")).default;
    useWebpack(app, join(__dirname, "..", "webpack.config"), {
      devMiddlewareOptions: {}
    });
  }
  app.use(cookieParser());
  /* Static */
  app.use("/", serverStatic(join(__dirname, "public")));
  /** Views/Pages */
  app.get("/", render("home"));
  app.get("/login", render("login"));
  app.get("/logout", [
    auth.middleware,
    render("logout"),
    redirectOnAuthError("/login")
  ]);
  app.get("/admin", [
    auth.middleware,
    render("admin"),
    redirectOnAuthError("/login")
  ]);
  app.post("/login", [json(), auth.loginHandler, PlainErrorHandler()]);
  app.post("/logout", [
    json(),
    auth.middleware,
    auth.logoutHandler,
    PlainErrorHandler()
  ]);
  /** Api */
  app.post("/api/auth/refresh", [
    auth.middleware,
    auth.refreshHandler,
    PlainErrorHandler()
  ]);
  return app;
}
