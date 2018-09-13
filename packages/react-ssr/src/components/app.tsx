import React, { ComponentType, StatelessComponent } from "react";
import { Layout } from "./layout";
import { Store } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import { Connected as Header } from "./header";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

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
        <ThemeProvider theme={theme}>
          <Layout Header={<Header />}>
            <Switch>
              {routes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};
export default App;
