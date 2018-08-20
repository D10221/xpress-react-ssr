import express from "express";
import { Express } from "express-serve-static-core";
import { join } from "path";
import render from "./render";
import serveFile from "./serve-file";
/** */
export default (app: Express) => new Promise<Express>((resolve, reject) => {
    try {
        app.use("/static", express.static(join(__dirname, "../static")));     
        app.get("/", render());
        return resolve(app);
    } catch (error) {
        return reject(error);
    }
})