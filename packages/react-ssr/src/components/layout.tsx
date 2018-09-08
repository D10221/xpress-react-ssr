import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import { Connected as Header } from "./header";

if (typeof window !== "undefined") {
  require("./layout.css");
}

export interface LayoutProps {}

export default class Layout extends React.Component<LayoutProps> {
  render() {
    return (
      <div className="layout-root">
        <Header />
        <div className="layout-content">
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </div>
        <footer>
          <div>... this is the footer</div>
          <div>... this is the footer</div>
        </footer>
      </div>
    );
  }
}
