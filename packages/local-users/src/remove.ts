import Debug from "debug";
import pkg from "./pkg";
import db from "@local/db";

const debug = Debug(
    `${pkg.name}/del`
);

export default async function remove($id: string) {
    const r = await (await db).run(
        "delete from users where id = $id", { $id }
    );
    debug(r.sql);
    return r;
}