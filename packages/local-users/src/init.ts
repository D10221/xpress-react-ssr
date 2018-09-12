import Debug from "debug";
import pkg from "./pkg";
import { readFile } from "fs";
import { resolve as resolvePath } from "path";
/** */
const debug = Debug(`${pkg.name}/init`);
import db from "@local/db";
/** */
export default new Promise<void>((resolve, reject) => {
    readFile(
        resolvePath(__dirname, "..", "sql", "init.sql"),
        {
            encoding: "utf8"
        },
        async (err, sqls) => {
            if (err) return reject(err);
            try {
                for (const sql of sqls.split("/*GO*/")) {
                    const r = await (await db).run(sql);
                    debug(r.sql);
                }
                resolve();
            } catch (error) {
                return reject(error);
            }
        }
    )
}
);