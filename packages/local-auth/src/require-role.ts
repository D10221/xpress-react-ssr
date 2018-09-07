import { RequestHandler } from "express";
/** */
export default function requireRole(roles: string[]): RequestHandler {
  if (!Array.isArray(roles))
    throw new Error("roles: string[] , required");
  /** */
  return (req, res, next) => {
    
    if(!roles.length) return next();

    const { user } = req;
    if (!user) return next(new Error("User required"));

    if (!Array.isArray(user.roles))
      return next(new Error(`Role: ${roles.join(",")} Required`));
    for (const role of user.roles) {
      if (roles.indexOf(role) !== -1) {
        return next();
      }
    }
    return next(new Error(`Role: ${roles.join(",")} Required`));
  };
}
