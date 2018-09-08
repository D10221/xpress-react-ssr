import express, { Express, Router } from "express";
import { resolve, join, extname, dirname } from "path";
import render from "./render";
import PlainErrorHandler from "./plain-error-handler";
import { redirectOnAuthError } from "@local/tiny-auth";
import cookieParser from "cookie-parser";
import Requirements from "./requirements";
import args from "./args";

/** */
export default async (app: Express) => {
  if (!!args["dev-middleware"]) {
    const useWebpack = (await import("@local/dev-middleware")).default;
    useWebpack(app, join(__dirname, "..", "webpack.config"), {
      devMiddlewareOptions: {
        // ...
      }
    });
  }

  /** serve/assets */
  const isSrc = /(\/||\\)src$/.test(dirname(__filename));
  const dir = resolve(__dirname, isSrc ? "../dist/public" : "public");
  console.log("Public Dir: %s", dir);
  app.use(express.static(dir));

  /** Auth */
  const {
    default: auth,
    configure: configureAuth,
    requireRole
  } = await import("@local/auth");
  app.use(cookieParser());
  app.use(
    "/api/auth",
    (await configureAuth(Router())).use(PlainErrorHandler())
  );

  /** apis */
  const { default: circuits } = await import("./api/circuits/api");
  app.use("/api/circuits", circuits());

  /** Routes, problem: 2 routers */
  const { default: routes } = await import("./routes");
  for (const route of routes) {
    if (!!route.private && !!route.path) {
      app.use(route.path, [
        auth.middleware(),
        requireRole(route.roles || []),
        // TODO: redirectOnRoleError("/you-should-be-${role}")
        redirectOnAuthError("/you-should-be-logged-in")
      ]);
    }
  }
  /** if isn't found handover to react-router */
  app.get("/*", [
    auth.middleware(false), // include user
    Requirements(routes), // action app/page/route requirements before render
    render //render app/page/route request-handler
  ]);
  return app;
};
