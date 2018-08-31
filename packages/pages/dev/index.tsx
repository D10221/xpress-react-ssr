import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createStore from "@local/tiny-store";
import Home from "../home/page";
import Login from "../login/page";
import Logout from "../logout/page";
const store = createStore({}, []);
render(<Provider store={store}>
    <Router>
        <Route path="/home" exact Component={Home} />
        <Route path="/login" exact Component={Login} />
        <Route path="/logout" exact Component={Logout} />
    </Router>
</Provider>, document.getElementById("root"));