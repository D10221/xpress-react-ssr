import { ErrorRequestHandler, Request } from "express";
import { AuthError } from "@local/tiny-auth";
import { JsonWebTokenError } from "jsonwebtoken";
/** */
function isApi(req: Request) {
  return /^\/api\/.*/.test(req.path);
}
/** */
export type IsApiCall = (req: Request) => boolean;
/** */
export default function ErrorHandler(isApiCall: IsApiCall = isApi): ErrorRequestHandler {
  /** */
  return function errorHandler(error, req, res, next) {
    if (!isApiCall(req)) {
      if (error instanceof AuthError) {
        return res.redirect("/login");
      }
      if (error instanceof JsonWebTokenError) {
        return res.redirect("/login");
      }
    }
    if (error instanceof Error) {
      return res
        .status(Number((error as any).code) || 500)
        .send(error.toString());
    }
    return next(error);
  };
}
