import { Request } from "express-serve-static-core";
/** */
export default function selector(req: Request) {
    const { path, params, query } = req;
    return { route: { path, params, query } };
}