import React from "react";
import ReactDOM from "react-dom/server";
import { RequestHandler, Request } from "express-serve-static-core";
import resolvePage from "./resolve";
const { PUBLIC_PATH } = process.env;
import HTML from "./html";
/** */
const Render = (page: string, getState: (req: Request) => {}): RequestHandler => {
    const Page = resolvePage(page);
    /** */
    return (req, res, next) => {
        try {
            const { title } = req.app.locals;
            const favicon = [PUBLIC_PATH, "favicon.ico"].join("/");
            const scripts = [
                `${[PUBLIC_PATH, "vendors"].join("/")}.js`,
                `${[PUBLIC_PATH, page].join("/")}.js`
            ];
            const manifest = [PUBLIC_PATH, "manifest.json"].join("/");
            const state = getState(req);
            res.send(
                ReactDOM.renderToString(
                    <HTML {...{ Page, title, scripts, favicon, manifest, state }}>
                        <div id="root" >{Page}</div>
                    </HTML>)
            )
        } catch (error) {
            return next(error);
        }
    }
}
export type Render = typeof Render;
/** */
export default Render;