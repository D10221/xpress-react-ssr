import React, { StatelessComponent, ReactNode } from "react";
import Html from "./html";

export interface Route {
  path: string;
  params: {};
  query: {};
}

export interface User {}

export interface PageProps {
  page: string;
  route: Route;
  header?(props: { user?: User; route: Route }): ReactNode;
}

const publicPath = process.env.PUBLIC_PATH || "";

/** */
const Page: StatelessComponent<PageProps> = props => {
  const { route, children, page } = props;
  return (
    <Html title="xpresso">
      {props.header && props.header({  route })}
      <div id="root" data-req={JSON.stringify({ route })}>
        {children}
        {<script src={[publicPath, "static", "vendors.js"].join("/")} />}
        <script src={[publicPath, "static", `${page}.js`].join("/")} />
      </div>
    </Html>
  );
};
export default Page;
