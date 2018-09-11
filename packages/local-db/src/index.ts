import Debug from "debug";
import path from "path";

const pkg = require(path.join(__dirname, "../package.json"));
const debug = Debug(`${pkg.name}`);
const cwd = process.cwd();
const { DB } = process.env;
const dbUrl = !DB
    ? ":memory:"
    : DB.startsWith(":")
        ? DB
        : path.resolve(cwd, DB);

const db = import("sqlite").then(sqlite => {
    const _db = sqlite.open(dbUrl)
    debug("db-url: %s", dbUrl);
    return _db;
});
export default db;