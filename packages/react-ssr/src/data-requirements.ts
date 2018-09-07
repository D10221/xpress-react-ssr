import { RequestHandler } from "express";
import { matchPath } from "react-router-dom";
import { RouteDefinition } from "./routes";
/** */
const dataRequirements = (routes: RouteDefinition[]): RequestHandler => {
    /** */
    return async (req, _, next) => {
        try {
            const { default: store } = await import("./store");
            
            const dataRequirements = routes
                .filter(route => matchPath(req.url, route)) // filter matching paths
                .map(route => route.component) // map to components
                .filter(comp => !!comp.serverFetch) // check if components have data requirement
                .map(x => {
                    console.log("server fetchs for %s", x.displayName || "anonymous")
                    return x;
                })
                .map(comp => {
                    return comp.serverFetch && store.dispatch(comp.serverFetch());
                }); // dispatch data requirement

            await Promise.all(dataRequirements);

            return next();

        } catch (error) {
            return next(error);
        }

    }
}
export default dataRequirements;