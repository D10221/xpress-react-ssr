import { hostName, authSecret, JWT_EXP_IN_SECONDS } from "./config";
import { Request, RequestHandler } from "express-serve-static-core";
import expressJwt, { IsRevokedCallback } from "express-jwt";
import jwt from "jsonwebtoken";
import uuid from "uuid";

export class AuthError extends Error {
  constructor(message: string, public code = 401) {
    super(message);
  }
}

/** */
export default function(options: {
  findUser: (username: string, password: string) => Promise<any>;
  userId: (user: any) => string|null|undefined;
  findToken: (id: string) => Promise<any>;
  revokeToken: (id: string) => Promise<any>;
  ignorePaths: string[];
}) {

  function getRequestCredentials(req: Request) {
    let { username, password } = req.body;
    // Headers Authorization Basic?
    // { username, password } = query
    // base64 encoded ?
    return [username, password];
  }

  function fromHeaderOrQuerystring(req: Request) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
  const { findToken, revokeToken } = options;
  /** Token Black List  */
  const isRevoked: IsRevokedCallback = async function(_req, payload, done) {
    try {
      const x = await findToken(payload.jti);
      return done(null, !!x);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  };
  const { ignorePaths } = options;

  const middleware = expressJwt({
    secret: authSecret,
    getToken: fromHeaderOrQuerystring,
    isRevoked: isRevoked
  }).unless({ path: ignorePaths });

  const { findUser, userId } = options;
  const loginHandler: RequestHandler = async (req, res, next) => {
    try {
      const [username, password] = getRequestCredentials(req);
      const user = await findUser(username, password);
      if (!user) return next(new AuthError("invalid credentials"));
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + JWT_EXP_IN_SECONDS,
          profile: user
        },
        authSecret,
        {
          issuer: hostName,
          audience: hostName,
          jwtid: uuid.v4(),
          subject: (await userId(user)) || ""
        }
      );
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  };
  const logoutHandler: RequestHandler = async (req, res, next) => {
    try {
      await revokeToken(req.user.token.jti);
      return res.send("ok");
    } catch (error) {
      return next(error);
    }
  };

  const refreshHandler: RequestHandler = async (req, res, next) => {
    try {
      await revokeToken(req.user.token.jti);
      const subject = (await userId(req.user)) || "";

      const verified: { exp?: any } | string = jwt.verify(
        req.user.token,
        authSecret,
        {
          issuer: hostName,
          audience: hostName,
          subject
        }
      );

      if (typeof verified !== "object") return next(new Error("Bad Token"));

      const { exp, ...token } = verified;
      return res.json({
        token: {
          ...token,
          exp: Math.floor(Date.now() / 1000) + JWT_EXP_IN_SECONDS
        }
      });
    } catch (error) {
      return next(error);
    }
  };
  return {
    middleware,
    loginHandler,
    logoutHandler,
    refreshHandler
  };
}
