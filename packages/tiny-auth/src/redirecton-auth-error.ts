import { ErrorRequestHandler } from "express-serve-static-core";
import { AuthError } from "./tiny-auth";;
import { JsonWebTokenError } from "jsonwebtoken";
import queryString from "querystring";
/** */
export default function redirectOnAuthError(redirectTo: string): ErrorRequestHandler {
    /** */
    return (error, req, res, next) => {
        if (req.method === "GET" && (error instanceof AuthError || error instanceof JsonWebTokenError)) {
            return res.redirect(`${redirectTo}?${queryString.stringify({ ref: req.path })}`);
        }
        next(error);
    }
}