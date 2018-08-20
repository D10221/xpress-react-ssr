import express from "express";
import { Express } from "express-serve-static-core";
import { resolve as join, isAbsolute } from "path";
import render from "./render";
// ...
const { PUBLIC_PATH } = process.env;
/** */
export default (app: Express) =>
  new Promise<Express>((resolve, reject) => {
    try {
      if (typeof PUBLIC_PATH !== "string") {
        throw new Error("PUBLIC_PATH not set");
      }
      const publicPath = isAbsolute(PUBLIC_PATH)
      ? PUBLIC_PATH
      : join(process.env.CWD || process.cwd(), PUBLIC_PATH);
      console.log("Public Path: %s", publicPath);
      app.use(
        "/static",
        express.static(publicPath)
      );
      app.get("/", render());
      return resolve(app);
    } catch (error) {
      return reject(error);
    }
  });
