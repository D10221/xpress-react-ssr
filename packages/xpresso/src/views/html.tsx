import { StatelessComponent } from "react";
import React from "react";
/** */
const Html: StatelessComponent<{ documentTitle: string, req: {} }> = props => {
  const { documentTitle } = props;
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
          <title>{documentTitle}</title>
          <link rel="manifest" href="static/manifest.json" />
          <link rel="shortcut icon" href="static/favicon.ico" />
        </head>
        <body>
          <div id="root" data-req={JSON.stringify(props.req)}>{props.children}</div>
          <script src="static/bundle.js" />
        </body>
      </html>
    </>
  );
};
export default Html;
