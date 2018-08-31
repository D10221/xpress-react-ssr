import { ErrorRequestHandler } from "express-serve-static-core";
/** */
export default function PlainErrorHandler(): ErrorRequestHandler {
  /** */
  return function errorHandler(error, _req, res, _next) {    
    const status = error && Number((error as any).code || (error as any).status);
    return res
      .status(status || 500)
      .send(error && error.message ? error.message : error.toString());
  };
}
