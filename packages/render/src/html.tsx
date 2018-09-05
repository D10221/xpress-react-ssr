import React, { StatelessComponent } from "react";

const HTML: StatelessComponent<{
  title: any;
  scripts: string[];
  favicon: any;
  manifest: any;
  state: {};
}> = ({ title, scripts, manifest, favicon, state, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        <link rel="shortcut icon" href={favicon} />
        <link rel="manifest" href={manifest} />
        {state && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.$STATE=${JSON.stringify(state)}
                `
            }}
          />
        )}
      </head>
      <body>
        {children}
        {scripts.map((src, i) => (
          <script key={`script_${i}`} defer src={src} />
        ))}
      </body>
    </html>
  );
};
export default HTML;
