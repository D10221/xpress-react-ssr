import { RequestHandler } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import App from "./components/app";
import store from "./store";
import { initialize } from "./store/session";

const render: RequestHandler = async (req, res) => {

  store.dispatch(initialize(req));

  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();
  const context = {};

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    "<!DOCTYPE html>" +
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>React SSR</title>
          {helmetData.title.toComponent()}
          {helmetData.meta.toComponent()}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.REDUX_DATA = ${JSON.stringify(reduxState)}`
            }}
          />
        </head>
        <body>
          <div id="app">
            <App {...{ store, location: req.url, context }} />
          </div>
          <script src="static/js/app.js" />
          <script src="static/js/vendors.js" />
        </body>
      </html>
    )
  );
};
export default render;
