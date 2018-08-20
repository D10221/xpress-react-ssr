import { RequestHandler } from "express-serve-static-core";
import reactDOM from "react-dom/server";
import React from "react";
import { Html } from "./views";
import App from "./views/browser/app";
/** */
export default function render(): RequestHandler {
  /** */
  return (_req, res, next) => {
    try {      
      return res.send(
        reactDOM.renderToString(
          <Html>
            <App />
          </Html>
        )
      );
    } catch (error) {
      return next(error);
    }
  };
}
