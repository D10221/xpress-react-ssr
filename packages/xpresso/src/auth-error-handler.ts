// import { ErrorRequestHandler } from "express-serve-static-core";
// import { AuthError } from "@local/tiny-auth";
// import { JsonWebTokenError } from "jsonwebtoken";
// import queryString from "querystring";
// /** */
// export default function(redirectTo: string): ErrorRequestHandler {
//     /** */
//     return (error, req, res, next) => {
//     if(req.method === "GET" && (error instanceof AuthError || error instanceof JsonWebTokenError )){
//         console.error(error);
//         res.setHeader("referer", req.path);
//         return res.redirect(`${redirectTo}?${queryString.stringify({ ref: req.path})}`);
//     }
//     next(error);
// }}