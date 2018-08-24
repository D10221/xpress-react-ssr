import { ErrorRequestHandler, Request } from "express";
import { AuthError } from "@local/tiny-auth";
import { JsonWebTokenError } from "jsonwebtoken";

function isApi(req: Request) {
  return /^\/api\/.*/.test(req.path);
}
/**
 *
 */
export default function ErrorHandler(
  isApiCall: (req: Request) => boolean = isApi
): ErrorRequestHandler {
  return function errorHandler(error, req, res, next) {
    if (error instanceof AuthError) {
      if (!isApiCall(req)) res.redirect("/login");
    }

    if (error instanceof JsonWebTokenError) {
      if (!isApiCall(req)) res.redirect("/login");
    }

    if (error instanceof Error) {
      return res
        .status(Number((error as any).code) || 500)
        .send(error.toString());
    }

    return next(error);
  };
}
