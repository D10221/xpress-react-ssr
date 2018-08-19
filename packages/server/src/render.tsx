import { RequestHandler } from "express-serve-static-core";
import reactDOM from "react-dom/server";
import React from "react";
import { Html } from "./views";
import App from "./views/browser/app";
/** */
export default function render(): RequestHandler {
  /** */
  return (req, res, next) => {
    return res.send(
      reactDOM.renderToString(
        <Html>
          <App />
        </Html>
      )
    );
  };
}
