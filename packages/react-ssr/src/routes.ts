import { ComponentType } from "react";
import { RouteProps } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import { Connected as Home } from "./components/home";
import Secret from "./components/Secret";
import { YouShouldBeLoggedIn, Login } from "./components/login";
/** */
export interface RouteDefinition extends RouteProps { }
/** */
const routes: (RouteProps & {
  component: ComponentType<any> & { serverFetch?: (...args: any[]) => any };
})[] = [
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/about",
      component: About,
      exact: true
    },
    {
      path: "/contact",
      component: Contact,
      exact: true
    },
    {
      path: "/secret",
      component: Secret,
      exact: true
    },
    {
      path: "/you-should-be-logged-in",
      component: YouShouldBeLoggedIn,
      exact: true
    },
    {
      path: "/login",
      component: Login,
      exact: true
    }
  ];
export default routes;
