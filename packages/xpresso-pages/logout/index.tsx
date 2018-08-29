import ReactDOM from "react-dom";
import View from "./view";
import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "../theme";
ReactDOM.hydrate(
  <MuiThemeProvider theme={theme}>
    <View />
  </MuiThemeProvider>,
  document.getElementById("root")
);
/** */
(module as any).hot && (module as any).hot.accept();