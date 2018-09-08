import { ComponentType } from "react";
import { RouteProps } from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import { Connected as Home } from "./components/home";
import { Connected as Profile } from "./components/profile";
import { YouShouldBeLoggedIn, Login } from "./components/login";
import { Connected as Admin } from "./components/admin";
/** */
export type AnyFunc = (...args: any[]) => any;
export type RouteRequirements = AnyFunc|(AnyFunc[]);
/** */
export interface RouteDefinition extends RouteProps {
  private?: boolean;
  roles?: string[];
  component: ComponentType<any> & { requirements?: RouteRequirements };  
}
/** */
const routes: RouteDefinition[] = [
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
    exact: true,
    private: true
  },
  {
    path: "/admin",
    component: Admin,
    exact: true,
    private: true,
    roles: ["admin"]
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
