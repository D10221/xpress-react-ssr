import { Express } from "express-serve-static-core";
import { static as serverStatic } from "express";
import { join } from "path";
import render from "./render";
/** */
export default async function configure(app: Express) {
    const useWebpack = (await import("./use-webpack")).default;
    await useWebpack(app);
    /* */
    app.use("/", serverStatic(join(__dirname, "public")));
    /** */
    app.get("/", render("home"));
    return app;
}