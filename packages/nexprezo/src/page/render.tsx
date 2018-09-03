import React from "react";
import ReactDOM from "react-dom/server";
import { RequestHandler } from "express-serve-static-core";
import resolvePage from "./resolve";
const { PUBLIC_PATH } = process.env;
/** */
export default (page: string): RequestHandler => {
    const Page = resolvePage(page);
    /** */
    return (req, res, next) => {       
        const { title } = req.app.locals;
        try {
            res.send(
                ReactDOM.renderToString(<html lang="en">
                    <head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                        <title>{title}</title>
                        <link rel="shortcut icon" href={[PUBLIC_PATH, "favicon.ico"].join("/")} />
                        <link
                            rel="manifest"
                            href={[PUBLIC_PATH, "manifest.json"].join("/")}
                        />
                    </head>
                    <body>
                        <div id="root" >{Page}</div>
                        <script defer src={`${[PUBLIC_PATH, "vendors"].join("/")}.js`} />
                        <script defer src={`${[PUBLIC_PATH, page].join("/")}.js`} />
                    </body>
                </html>)
            )
        } catch (error) {
            return next(error);
        }
    }
}