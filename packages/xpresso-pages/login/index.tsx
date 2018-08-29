import ReactDOM from "react-dom";
import View from "./connected";
import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "../theme";
import { Provider } from "react-redux";
import { reducer, STORE_KEY, middleware } from "./store";
import createStore from "../store";

const store = createStore({ [STORE_KEY]: reducer }, [ middleware ]);

ReactDOM.hydrate(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <View />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
/** */
(module as any).hot && (module as any).hot.accept();