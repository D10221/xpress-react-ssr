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

/** */
const Page: StatelessComponent<PageProps> = props => {
  const {  children,  title } = props;
  return (
    <Html title={title}>
      {props.header}
      <div id="root" >{children}</div>
    </Html>
  );
};
export default Page;
