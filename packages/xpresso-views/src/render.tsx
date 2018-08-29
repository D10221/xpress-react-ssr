import { RequestHandler, Request } from "express-serve-static-core";
import reactDOM from "react-dom/server";
import React, { ComponentType, Attributes } from "react";

/** ? */
export default function render<P>(K: ComponentType<P>, serverSideProps?: (req: Request) => P & Attributes): RequestHandler {
  /** */
  return (req, res, next) => {
    const props = (serverSideProps && serverSideProps(req));
    try {
      return res.send(
        reactDOM.renderToString(React.createElement(K, props))
      );
    } catch (error) {
      return next(error);
    }
  };
}
