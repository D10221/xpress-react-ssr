import React, { ComponentType, StatelessComponent } from "react";
import Layout from "./Layout";
import { Store } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, StaticRouter } from "react-router-dom";
const isWindow = typeof window !== "undefined";

let Router: ComponentType = isWindow ? BrowserRouter : StaticRouter;

const App: ComponentType<{
  store: Store;
  basename?: string;
  location?: string | object;
  context?: {
    url?: string;
    action?: "PUSH" | "REPLACE";
    location?: object;
  };
}> = ({ store, context, location, basename }) => {
  return (
    <Provider store={store}>
      <Router {...{ context, location, basename }}>
        <Layout />
      </Router>
    </Provider>
  );
};
export default App;
