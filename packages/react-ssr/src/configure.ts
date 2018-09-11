import { Express, Router } from "express";
import render from "./render";
import PlainErrorHandler from "./plain-error-handler";
import { redirectOnAuthError } from "@local/tiny-auth";
import cookieParser from "cookie-parser";
import Requirements from "./requirements";

/** */
export default async (app: Express) => {
  /** use webpack-dev-server: if this is ./src */
  const { resolve, dirname } = await import("path");
  const isSrc = /(\/||\\)src$/.test(dirname(__filename));
  if (!isSrc) {
    const express = await import("express");
    app.use(express.static(resolve(__dirname, "public")));
  } else {
    console.log("Not serving static");
  }

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
  app.get(/(\/)?.*/, [
    auth.middleware(false), // include user
    Requirements(routes), // action app/page/route requirements before render
    render //render app/page/route request-handler
  ]);
  return app;
};
