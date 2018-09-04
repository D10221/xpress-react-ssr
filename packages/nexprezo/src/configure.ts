import { Express } from "express-serve-static-core";
import { static as serverStatic } from "express";
import { join } from "path";
import auth, { redirectOnAuthError } from "@local/auth";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import PlainErrorHandler from "./plain-error.handler";
/** */
export default async function configure(app: Express) {
  if (process.env.NODE_ENV !== "production") {
    const useWebpack = (await import("@local/dev-middleware")).default;
    useWebpack(app, join(__dirname, "..", "webpack.config"), {
      devMiddlewareOptions: {
        // ...
      }
    });
  }
  app.use(cookieParser());
  /* Static */
  app.use("/", serverStatic(join(__dirname, "public")));
  /** Views/Pages */
  app.use((req, res, next) => {
    req.app.locals.title = `Nexprezo: ${req.path}`;
    next();
  });
  const { default: render } = await import("@local/render");
  /**
   * windowstateStore({ [windowStateStore.$KEY] = { ...x }})
   */
  const getState = () => ({});
  app.get("/", render("home", getState));
  app.get("/login", render("login", getState));
  app.get("/logout", [
    auth.middleware,
    render("logout", getState),
    redirectOnAuthError("/login")
  ]);
  app.get("/admin", [
    auth.middleware,
    render("admin", getState),
    redirectOnAuthError("/login")
  ]);
  /** Api */
  app.post("/login", [json(), auth.loginHandler, PlainErrorHandler()]);
  app.post("/logout", [
    json(),
    auth.middleware,
    auth.logoutHandler,
    PlainErrorHandler()
  ]);
  // ?
  app.post("/auth/refresh", [
    auth.middleware,
    auth.refreshHandler,
    PlainErrorHandler()
  ]);
  return app;
}
