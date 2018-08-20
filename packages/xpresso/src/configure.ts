import express from "express";
import { Express } from "express-serve-static-core";
import { join } from "path";
import render from "./render";
import serveFile from "./serve-file";
/** */
export default (app: Express) => new Promise<Express>((resolve, reject) => {
    try {
        app.use("/public", express.static(join(__dirname, "../public")));
        app.use("/favicon.ico", serveFile("../public/favicon.ico"));
        app.use("/manifest.json", serveFile("../public/manifest.json"));
        app.get("/", render());
        return resolve(app);
    } catch (error) {
        return reject(error);
    }
})