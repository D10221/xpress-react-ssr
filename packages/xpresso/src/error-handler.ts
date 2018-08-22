import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = function errorHandler(
  error,
  _req,
  res,
  next
) {
  if (error instanceof Error) {
    return res.status((error as any).code || 500).send(error.toString());
  }
  return next(error);
};
export default errorHandler;
