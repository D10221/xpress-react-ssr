import { render } from "react-dom";
import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
require("./styles.css");
const history = createBrowserHistory();
render(
  <Router history={history}>
    <Switch>
      <Route path="/home" component={require("../home/page").default} />
      <Route path="/login" Component={require("../login/page").default} />
      <Route path="/logout" Component={require("../logout/page")} />
      <Route
        path="*"
        render={() => {
          return (
            <div className="root">
              <nav className="row">
                <Link className="link" to="/home">
                  Home
                </Link>
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link className="link" to="/logout">
                  Logout
                </Link>
              </nav>
            </div>
          );
        }}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
