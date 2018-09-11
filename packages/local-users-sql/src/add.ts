import Debug from "debug";
import pkg from "./pkg";
import db from "@local/db";

const debug = Debug(
    `${pkg.name}/add`
);

export default async function add(user: {
    id: string;
    password: string;
    displayName: string;
    email: string;
    roles: string[];
}) {
    const { default: crypto } = await import("./crypto");
    const { id, displayName, email, roles, password } = user;
    const r = await (await db).run(
        "insert into users ( id, displayName, email, roles, password ) values ($id, $displayName, $email, $roles, $password)",
        {
            $id: id,
            $displayName: displayName,
            $email: email,
            $roles: (roles && roles.join(",")) || "",
            $password: crypto.encrypt(password)
        }
    );
    debug(r.sql);
    return r;
}