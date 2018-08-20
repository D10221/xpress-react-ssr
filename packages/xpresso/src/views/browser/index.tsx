import ReactDOM from "react-dom";
import App from "./app";
import React from "react";
import registerServiceWorker from './registerServiceWorker';
ReactDOM.hydrate(<App />, document.getElementById("root"));
registerServiceWorker();