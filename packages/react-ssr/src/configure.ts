import express, { Express, Router } from "express";
import path from "path";
import render from "./render";
import PlainErrorHandler from "./plain-error-handler";
import { redirectOnAuthError } from "@local/tiny-auth";
import cookieParser from "cookie-parser";
/** */
export default async (app: Express) => {
  const {
    default: auth,
    configure: configureAuth,
    requireRole
  } = await import("@local/auth");
  /** serve/assets */
  app.use(express.static(path.resolve(__dirname, "../dist")));
  /** Api */
  app.use(cookieParser());
  app.use(
    "/api/auth",
    (await configureAuth(Router())).use(PlainErrorHandler())
  );
  /** Routes, problem: 2 routers */
  const { default: routes } = await import("./routes");  
  for (const route of routes) {
    if (!!route.private && !!route.path) {
      app.use(route.path, [
        auth.middleware(),
        requireRole(route.roles||[]),
        // TODO: redirectOnRoleError("/you-should-be-${role}")
        redirectOnAuthError("/you-should-be-logged-in")
      ]);
    }
  }
  /** if isn't found handover to react-router */
  app.get("/*", [auth.middleware(false), render]);
  return app;
};
