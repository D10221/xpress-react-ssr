import {
    CrudController,
    ensureBody,
    ensureID,
    // rejectKeys,
} from "@local/crud-controller";
import { json } from "body-parser";
import { Express, RequestHandler, Router, Application } from "express";
import auth, { requireRole } from "@local/auth";
import users from "@local/users";
import Debug from "debug";
const debug = Debug("api/users");
/**
 *
 * @param _app {Express | Router | Application}
 */
export default async function admin(_app?: Express | Router | Application) {

    const crud = CrudController(await users);
    const router = Router();
    router.get(`/:id?`, [auth.middleware(), requireRole(["admin"]), crud.get(({ password, ...user }) => user)]);
    /** Add */
    router.put(`/:id?`, [
        auth.middleware(),
        requireRole(["admin"]),
        json(),
        ensureBody(),
        ensureID(),       
        crud.put()
    ]);
    /** Update */
    router.post(`/:id?`, [
        auth.middleware(),
        requireRole(["admin"]),
        json(),
        ensureBody(),
        ensureID(), // reject missing id
        // rejectKeys(["password"]),
        crud.post()
    ]);
    /** Delete/remove */
    router.delete(`/:id?`, [
        auth.middleware(),
        requireRole(["admin"]),
        json(),
        ensureBody(),
        ensureID(), // reject no id
        crud.dlete()
    ]);
    debug("configured");
    return router;
}
