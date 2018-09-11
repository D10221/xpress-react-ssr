import Debug from "debug";
import path from "path";
import sqlite, { Database } from "sqlite";

const pkg = require(path.join(__dirname, "../package.json"));

const debug = Debug(`${pkg.name}`);

let db: Database;
export default Object.assign(
    new Promise<Database>(async (resolve, reject) => {
        try {
            debug("resolving");
            const cwd = process.cwd();
            const { DB } = process.env;
            const dbUrl = !DB
                ? ":memory:"
                : DB.startsWith(":")
                    ? DB
                    : path.resolve(cwd, DB);
            db = await sqlite.open(dbUrl);
            debug("db-url: %s", dbUrl);
            return resolve(db);
        } catch (error) {
            debug(error);
            return reject(error);
        }
    }),
    {
        instance: () => db
    }
);