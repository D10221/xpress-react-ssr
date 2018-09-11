import findOne from "./find-one";
import { User } from "./types";
import Debug from "debug";
import pkg from "./pkg";
import db from "@local/db";
import crypto from "./crypto";
/** */
const debug = Debug(
    `${pkg.name}/update`
);
/** */
export default async function update(user: Partial<User> & { roles?: string[] }) {
    if (!user.id) throw new Error("user.id: Required");

    const current = await findOne(`id = '${user.id}'`);

    const sql = `
          update users set 
              displayName = $displayName,
              disabled = $disabled,
              password = $password,
              email = $email,
              roles = $roles,            
              updatedAt = datetime('now')
          where id = $id;
          `;
    debug(sql);
    const params = {
        $id: user.id,
        $displayName: user.displayName || current.displayName,
        $disabled:
            (typeof user.disabled === "boolean" && user.disabled) ||
            current.disabled,
        $email: user.email || current.email,
        $password:
            (user.password && crypto.encrypt(user.password)) || current.password,
        $roles: (user.roles && user.roles.join(",")) || current.roles
    };
    const r = await (await db).run(sql, params);
    debug(r.sql);
    return r;
}