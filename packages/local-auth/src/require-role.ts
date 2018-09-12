import { RequestHandler } from "express";
/** */
export default function requireRole(roles: string[]): RequestHandler {
  if (!Array.isArray(roles))
    throw new Error("roles: string[] , required");
  /** */
  return (req, _res, next) => {
    if (!roles.length) return next();
    const { user } = req;
    const userRoles = (user && ((Array.isArray(user.roles) && user.roles) || (typeof user.roles === "string" && user.roles.split(",")))) || [];
    for (const role of userRoles) {
      if (roles.indexOf(role) !== -1) {
        return next();
      }
    }
    return next(new Error(`Role: ${roles.join(",")} Required`));
  };
}
