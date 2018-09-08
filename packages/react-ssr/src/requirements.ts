import { RequestHandler } from "express";
import { matchPath } from "react-router-dom";
import { RouteDefinition, RouteRequirements } from "./routes";
import store from "./store";
/**
 *
 * @param requirements
 */
function satisfy(requirements?: RouteRequirements): any {
  if (typeof requirements === "function") {
    return store.dispatch(requirements());
  }
  if (Array.isArray(requirements)) {
    // children data requirements
    return Promise.all(
      requirements.map(action => {
        if (Array.isArray(action)) return satisfy(action);
        return store.dispatch(action());
      })
    );
  }
  throw new Error(`Bad requirement type ${typeof requirements}`);
}

/** */
const Requirements = (routes: RouteDefinition[]): RequestHandler => {
  /** */
  return async (req, _, next) => {
    try {
      const requirements = routes
        .filter(route => matchPath(req.url, route)) // filter matching paths
        .map(route => route.component) // map to components
        .filter(comp => !!comp.requirements) // check if components have data requirement
        .map((x, i) => {
          console.log(
            "#%s Satisfy %s requirements",
            i + 1,
            x.displayName || "anonymous"
          );
          return satisfy(x.requirements);
        });

      await Promise.all(requirements);

      return next();
    } catch (error) {
      return next(error);
    }
  };
};
export default Requirements;
