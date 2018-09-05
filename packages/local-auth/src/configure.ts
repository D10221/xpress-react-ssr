import { Express, Router as ExpressRouter } from "express-serve-static-core";
import { json } from "body-parser";
import auth from "./auth";
/**
 *
 */
const configure = async <T extends Express | ExpressRouter>(app: T): Promise<T> => {  
  try {
    app.post("/login", [
      json(), auth.loginHandler
    ]);
    app.post("/logout", [
      json(),
      auth.middleware,
      auth.logoutHandler,    
    ]);
    app.post("/refresh", [
      auth.middleware,
      auth.refreshHandler,    
    ]);
    return app;    
  } catch (error) {
    return Promise.reject(error);
  }
};
export default configure;
