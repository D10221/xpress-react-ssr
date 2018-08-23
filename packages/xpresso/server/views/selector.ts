import { Request } from "express-serve-static-core";
/** */
export default function selector(req: Request) {
    const { path, params, query, user } = req;
    return { user, route: { path, params, query } };
}