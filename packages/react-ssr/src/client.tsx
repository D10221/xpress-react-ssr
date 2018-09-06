import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import App from "./components/app";
ReactDOM.hydrate(<App {...{ store }} />, document.getElementById("app"));
