import { StatelessComponent } from "react";
import React from "react";
/** */
const Html: StatelessComponent<{ title: string; }> = props => {
  const { title } = props;
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>{title}</title>
          <link rel="manifest" href="static/manifest.json" />
          <link rel="shortcut icon" href="static/favicon.ico" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
};
export default Html;