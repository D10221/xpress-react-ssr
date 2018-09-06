import { RequestHandler } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { matchPath } from "react-router-dom";
import App from "./components/app";
import routes from "./routes";
import store from "./store";
import { initialize } from "./store/session";

const render: RequestHandler = async (req, res) => {
  const context = {};

  const dataRequirements = routes
    .filter(route => matchPath(req.url, route)) // filter matching paths
    .map(route => route.component) // map to components
    .filter(comp => !!comp.serverFetch) // check if components have data requirement
    .map(x => {
      console.log("server fetchs for %s", x.displayName || "anonymous")
      return x;
    })
    .map(comp => comp.serverFetch && store.dispatch(comp.serverFetch())); // dispatch data requirement

  await Promise.all(dataRequirements);

  store.dispatch(initialize(req));
  
  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();

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
          <script src="./app.bundle.js" />
        </body>
      </html>
    )
  );
};
export default render;
