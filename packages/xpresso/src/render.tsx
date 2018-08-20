import { RequestHandler } from "express-serve-static-core";
import reactDOM from "react-dom/server";
import React from "react";
import { Html } from "./views";
/** */
export default function render(): RequestHandler {
  /** */
  return (req, res, next) => {
    const { path, params, query, user } = req;
    try {
      return res.send(
        reactDOM.renderToString(
          <Html documentTitle="xpresso" req={{ path, params, query, user }}>
            ... loading
          </Html>
        )
      );
    } catch (error) {
      return next(error);
    }
  };
}
