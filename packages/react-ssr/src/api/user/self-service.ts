import {
    ensureBody,
    ensureID,
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
export default async function selfService(_app?: Express | Router | Application) {
    const _users = (await users);
    const router = Router();
    router.get(`/`, [
        auth.middleware(),
        requireRole(["user"]),
        (async (req, res, next) => {
            try {
                const { password, ...user } = await _users.findById(req.user.id);
                res.json(user);
            } catch (error) {
                next(error);
            }
        }) as RequestHandler,
    ]
    );
    interface PassworChangeRequest {
        password: string;
        newPassword: string;
    }
    /** Update */
    router.post(`/`, [
        auth.middleware(),
        requireRole(["user"]),
        json(),
        ensureBody(),
        (async (req, res, next) => {
            try {
                const { displayName, email, password } = req.body as { displayName: string, email: string, password: string };
                const found = (await _users.find(`id = '${req.user.id}'`, ({ password: pwd }) => {
                    return pwd === password;
                }))[0];

                if (!found) return next(new Error("Wrong Credentials"));

                const r = await _users.update({
                    ...found,
                    displayName: displayName || found.displayName,
                    email: email || found.email,
                })
                res.json(r);
            } catch (error) {
                next(error);
            }
        }) as RequestHandler,
    ]);
    /** Update */
    router.post(`/password`, [
        auth.middleware(),
        requireRole(["user"]),
        json(),
        ensureBody<PassworChangeRequest, keyof PassworChangeRequest>([
            "password",
            "newPassword",
        ]),
        (async (req, res, next) => {
            try {
                const { password, newPassword } = req.body as PassworChangeRequest;
                const found = (await _users.find(`id = '${req.user.id}'`, ({ password: pwd }) => {
                    return pwd === password;
                }))[0];

                if (!found) return next(new Error("Wrong Credentials"));
                const r = await _users.update({
                    ...found,
                    password: newPassword,
                })
                res.json(r);
            } catch (error) {
                next(error);
            }
        }) as RequestHandler,
    ]);
    /** Delete/remove */
    router.delete(`/remove`, [
        auth.middleware(),
        requireRole(["user"]),
        json(),
        ensureBody(),
        ensureID(),
        (async (req, res, next) => {
            try {
                const r = await _users.remove(req.user.id);
                res.json(r);
            } catch (error) {
                next(error);
            }
        }) as RequestHandler,
    ]);
    debug("configured");
    return router;
}
