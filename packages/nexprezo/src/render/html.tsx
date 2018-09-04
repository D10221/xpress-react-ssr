import React, { StatelessComponent } from "react";

const HTML: StatelessComponent<{ title: any, scripts: string[], favicon: any, manifest: any }> = ({ title, scripts, manifest, favicon, children }) => {
    return <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>{title}</title>
            <link rel="shortcut icon" href={favicon} />
            <link
                rel="manifest"
                href={manifest}
            />
        </head>
        <body>
            {children}
            {scripts.map(src => <script defer src={src} />)}
        </body>
    </html>
}
export default HTML;