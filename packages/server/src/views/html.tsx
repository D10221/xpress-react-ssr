import { StatelessComponent } from "react";
import React from "react";
/** */
const Html: StatelessComponent = props => {
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
          <title>Document</title>
        </head>
        <body>
          <div id="root">{props.children}</div>
          <script src="static/bundle.js" />
        </body>
      </html>
    </>
  );
};
export default Html;
