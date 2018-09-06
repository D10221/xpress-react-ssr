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
    
    app.use(express.static(path.resolve(__dirname, "../dist")));
    /** Api */
    app.use(cookieParser());
    app.use(
        "/api/auth",
        (await configureAuth(Router())).use(PlainErrorHandler())
    );
    app.use("/profile", [
        auth.middleware(), 
        redirectOnAuthError("/you-should-be-logged-in")
    ])
    app.use("/admin", [
        auth.middleware(), 
        requireRole(["admin"]),
        redirectOnAuthError("/you-should-be-logged-in")
    ])
    app.get("/*", [
        auth.middleware(false), 
        render]);
    return app;
}