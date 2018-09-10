import sqlite, { Database } from "sqlite";
import { resolve } from "path";
import { unlinkSync, existsSync } from "fs";
const dbPath = resolve(__dirname, "users.db");
if (existsSync(dbPath)) {
    unlinkSync(dbPath);
}
let db: Database;

beforeAll(async () => {
    db = await sqlite.open(dbPath, { verbose: true });
    process.env.USERS_SECRET = "ABCDEF0123456789"
});

describe("users", () => {
    it("works", async () => {
        const { default: _users } = await import("../src");
        const users = await _users(db);
        const user = await users.byId("admin");
        expect(user.id).toBe("admin");
        const r = await users.add({
            id: "bob",
            displayName: "Bob",
            password: "bob",
            email: "bob@localhost",
            roles: ["user"]
        });
        expect((await users.byId("bob")).id).toBe("bob");
    });
    it("updates", async () => {
        const { default: _users } = await import("../src");
        const users = await _users(db);
        await users.update({ id: "admin", displayName: "Admin1", });
        expect((await users.byId("admin")).displayName).toBe("Admin1");
    });
    /** */
    it("finds", async () => {
        const { default: _users } = await import("../src");
        const users = await _users(db);
        expect((
            await users.find(({ id, roles, password }) => id === "admin" && roles.indexOf("admin") !== -1 && password === "")
        )[0].id).toBe("admin");
        expect((
            await users.find(({ id, password }) => {
                console.log("FIND: !", {id, password});
                return id === "bob" && password === "bob"
            })
        )[0].id).toBe("bob");
    });
})