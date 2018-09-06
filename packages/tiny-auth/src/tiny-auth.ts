import { Request, RequestHandler } from "express-serve-static-core";
import unless from "express-unless";
import jwt from "jsonwebtoken";
import uuid from "uuid";

export interface SignParams {
  issuer: string,
  audience: string,
  jwtid: string,
  expInSeconds: number,
  profile: {},
  subject: string,
  secret: string,
  extra?: {}
};

export class AuthError extends Error {
  constructor(message: string, public code = 401, public reason: string = "Auth Error", public token = "", public payload: any = {}) {
    super(message);
  }
}

export interface AnyUser { [key: string]: any };

export interface Unless {
  unless: typeof unless
};

/** */
export default function <User extends AnyUser, UserKey extends keyof User & string>(options: {
  hostName: string,
  secret: string,
  expInSeconds: number,
  findUser: (username: string, password: string) => Promise<User | undefined | null>;
  profileIdKey: UserKey;
  isRevoked: (id: string) => Promise<boolean>;
  revokeToken: (id: string) => Promise<any>;
}) {
  const jwtTokenCookieKey = "jwt-token";

  function getRequestCredentials(req: Request) {
    let { username, password } = req.body;
    // Headers Authorization Basic?
    // { username, password } = query
    // base64 encoded ?
    return [username, password];
  }

  function getToken(req: Request) {
    const cookie = req.cookies && req.cookies[jwtTokenCookieKey]
    if (!!cookie) {
      return cookie;
    }
    if (
      typeof req.headers.authorization === "string" &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
  const { isRevoked, revokeToken } = options;

  const { hostName, secret, expInSeconds } = options;

  /** 
   * @param required {boolean} if required rejects with next(error) else user is empty
  */
  const middleware: (required?: boolean) => RequestHandler & Unless = (required = true) => {
    /** */
    return Object.assign(
      /** */
      async function middleware(req, _res, next) {
        try {
          const token = getToken(req);

          const verified: { jti?: string, profile?: {} } | null = token && (() => {
            const x = jwt.verify(token, secret, {
              audience: hostName,
              issuer: hostName,
            })
            return (typeof x === "object" && x) || null;
          })();
          if (required) {
            if (!token) {
              return next(new AuthError("Invalid Token", 401, ":!not-found", token, {}));
            }
            if (!verified) {
              return next(new AuthError("Invalid Token", 401, ":!verified", token, verified));
            }
            if (!verified.jti) {
              return next(new AuthError("Invalid Token", 401, ":!jwtid", token, verified));
            }
            if (await isRevoked(verified.jti)) {
              return next(new AuthError("Invalid Token", 401, ":revoked", token, verified));
            }
          }
          req.user = verified && verified.profile;
          req.user.token = req.user && token;
          return next();
        } catch (error) {          
          return next(required && error);
        }
      } as RequestHandler,
      { unless }
    )
  }

  function sign(params: SignParams) {
    const { expInSeconds, audience, jwtid, profile, subject, issuer, secret } = params;
    const extra = params.extra || {};
    const extraKeys = Object.keys(extra || {});
    for (const key of extraKeys) {
      if (key in params) {
        throw new Error("Key conflict: " + key);
      }
      if (["exp", "secret", "sub", "aud", "profile", "expiresIn", "iss", "jti", "iat"].indexOf(key) !== -1) {
        throw new Error("Key conflict: " + key);
      }
    }
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + expInSeconds,
        profile,
        ...extra
      },
      secret,
      {
        issuer,
        audience,
        jwtid,
        subject
      }
    )
  }
  const { findUser, profileIdKey } = options;

  const signParamsFromUser = (user: User, extra?: {}): SignParams => {
    return {
      issuer: hostName,
      audience: hostName,
      expInSeconds,
      jwtid: uuid.v4(),
      profile: user,
      subject: user[profileIdKey] || "",
      secret,
      extra
    }
  }

  const loginHandler: RequestHandler = async (req, res, next) => {
    try {
      const [username, password, ref] = getRequestCredentials(req);
      const user = await findUser(username, password);
      if (!user) return next(new AuthError("invalid credentials"));
      const token = sign(signParamsFromUser(user, {}));
      res.cookie && res.cookie(jwtTokenCookieKey, token, {
        httpOnly: true
      })
      if (typeof ref === "string") {
        return res.redirect(ref);
      }
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  };

  async function tryRevokeToken(token: string) {
    if (token) {
      const { exp, jti } = jwt.decode(token) as any;
      //todo: seconds vs milliseconds?;
      if (Date.now() > exp && jti) {
        await revokeToken(jti);
      }
    }
    return;
  }

  const logoutHandler: RequestHandler = async (req, res, next) => {
    try {
      await tryRevokeToken(getToken(req));
      res.cookie(jwtTokenCookieKey, "");
      return res.send("ok");
    } catch (error) {
      return next(error);
    }
  };

  const refreshHandler: RequestHandler = async (req, res, next) => {
    try {
      const token = getToken(req);
      await tryRevokeToken(token);
      const subject = req.user[profileIdKey] || "";
      const verified: { exp?: any } | string = jwt.verify(
        token,
        secret,
        {
          issuer: hostName,
          audience: hostName,
          subject
        }
      );

      if (typeof verified !== "object") return next(new Error("Bad Token"));

      const { exp, ...rest } = verified;
      return res.json({
        token: {
          ...rest,
          exp: Math.floor(Date.now() / 1000) + expInSeconds
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
    refreshHandler,
    sign,
    signParamsFromUser
  };
}
