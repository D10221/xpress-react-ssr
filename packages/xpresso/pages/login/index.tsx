import ReactDOM from "react-dom";
import View from "./connected";
import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "../theme";
import { Provider } from "react-redux";
import { reducer } from "./store";
import createStore from "../store";

const store = createStore({ login: reducer });

ReactDOM.hydrate(
    <Provider store={store}><MuiThemeProvider theme={theme}>
        <View />
    </MuiThemeProvider></Provider>
    , document.getElementById("root"));

module.hot && module.hot.accept();