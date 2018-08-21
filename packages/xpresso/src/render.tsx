import { RequestHandler } from "express-serve-static-core";
import reactDOM from "react-dom/server";
import React from "react";
import { Html } from "./views";
import UserMenu from "./views/user-menu";
import Header from "./views/header";
/** */
export default function render(): RequestHandler {
  /** */
  return (req, res, next) => {
    const { path, params, query, user } = req;
    try {
      return res.send(
        reactDOM.renderToString(
          <Html title="xpresso" >
            <Header title={<span style={{textTransform: "uppercase"}}>xpresso</span>}><UserMenu user={user}/></Header>
            <div id="root" data-req={JSON.stringify({ path, params, query, user })}>
              <UserMenu user={user}/>
            </div>
            <script src="static/bundle.js" />
          </Html>
        )
      );
    } catch (error) {
      return next(error);
    }
  };
}
