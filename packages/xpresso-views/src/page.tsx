import React, { StatelessComponent, ReactNode } from "react";
import Html from "./html";

export interface Route {
  path: string;
  params: {};
  query: {};
}

export interface PageProps {
  title: string,
  page: string;
  route: Route;
  header?: ReactNode;
}

const publicPath = process.env.PUBLIC_PATH || "";

/** */
const Page: StatelessComponent<PageProps> = props => {
  const { route, children, page, title } = props;
  return (
    <Html title={title}>
      {props.header}
      <div id="root" data-req={JSON.stringify({ route })}>
        {children}
        {<script src={[publicPath, "static", "vendors.js"].join("/")} />}
        <script src={[publicPath, "static", `${page}.js`].join("/")} />
      </div>
    </Html>
  );
};
export default Page;
