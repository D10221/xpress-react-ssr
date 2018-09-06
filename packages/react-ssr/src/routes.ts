import { ComponentType } from "react";
import { RouteProps } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import { Connected as Home } from "./components/home";
import { Connected as Profile } from "./components/profile";
import { YouShouldBeLoggedIn, Login } from "./components/login";
import { Connected as Admin} from "./components/admin";
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
      path: "/profile",
      component: Profile,
      exact: true
    },
    {
      path: "/admin",
      component: Admin,
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
