import { render } from "react-dom";
import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import Home from "../home/page";
import Login from "../login/page";
import Logout from "../logout/page";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
render(
    <Router history={history}>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/logout" Component={Logout} />
            <Route path="*" render={() => {
                return (<div >
                    <nav>
                        <Link to="/home">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/logout">Logout</Link>
                    </nav>
                </div >);
            }} />
        </Switch>
    </Router>
    , document.getElementById("root"));