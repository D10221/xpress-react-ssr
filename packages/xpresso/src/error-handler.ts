import { ErrorRequestHandler, Request } from "express-serve-static-core";
/** */
export type IsApiCall = (req: Request) => boolean;
/** */
export default function ErrorHandler(): ErrorRequestHandler {
  /** */
  return function errorHandler(error, req, res, _next) {
    console.log("handling error: %s", error.toString())  
    const status = error && Number((error as any).code || (error as any).status);
    return res
      .status(status || 500)
      .send(error && error.message ? error.message : error.toString());
  };
}
