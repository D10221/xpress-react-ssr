import { Express } from "express-serve-static-core";
import { static as serverStatic } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import PlainErrorHandler from "./plain-error.handler";
import { Router } from "express";
import { redirectOnAuthError } from "@local/tiny-auth";
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

  app.use((req, res, next) => {
    /** render/template: expects app.locals.title */
    req.app.locals.title = `Nexprezo: ${req.path}`;
    next();
  });

  const { default: render } = await import("@local/render");
  const {
    default: auth,
    configure: configureAuth
  } = await import("@local/auth");

  /** Api */
  app.use(
    "/api/auth",
    (await configureAuth(Router())).use(PlainErrorHandler())
  );
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

  /* Static */
  app.use("/", serverStatic(join(__dirname, "public")));

  return app;
}
