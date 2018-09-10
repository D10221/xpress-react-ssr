import { Database } from "sqlite";
import { resolve as resolvePath, join } from "path";
import { readFile } from "fs";
import Crypto from "@local/crypto";
import Debug from "debug";
const debug = Debug(require(join(__dirname, "..", "package.json")).name);
const crypto = new Crypto({ password: process.env.USERS_SECRET || "" });

export interface User {
    id: string;
    displayName: string;
    email: string;
    roles: string;
    password: string;
    disabled: boolean;
    createdAt: Date;
    upgradedAt: Date;
}

export default async function (db: Database) {
    const sqls = await new Promise<string>((resolve, reject) => readFile(
        resolvePath(__dirname, "..", "sql", "init.sql"), {
            encoding: "utf8"
        }, (err, text) => err ? reject(err) : resolve(text)));

    for (const sql of sqls.split("/*GO*/")) {
        const ret = await db.run(sql);
        debug(ret.sql);
    }
    /** */
    async function add(user: { id: string, password: string, displayName: string, email: string, roles: string[] }) {
        const { id, displayName, email, roles, password } = user;
        const x = await db.run("insert into users ( id, displayName, email, roles, password ) values ($id, $displayName, $email, $roles, $password)", {
            $id: id,
            $displayName: displayName,
            $email: email,
            $roles: roles && roles.join(",") || "",
            $password: crypto.encrypt(password)
        });
        debug(x.sql);
    }
    /** */
    async function byId(id: string): Promise<User> {
        const r = await db.get(`select * from users where id = $id`, { $id: id });
        return r;
    }

    // function decrypt(text: string) {
    //     try {
    //         crypto.decrypt(text);
    //     } catch (error) {
    //         return "";
    //     }
    // }

    return {
        byId,
        add,
        async all() {
            return db.all("select * from users");
        },
        async find(f: (x: Partial<User>) => boolean): Promise<User[]> {
            let users: User[] = []
            await db.each("select * from users", (err, row) => {
                if (err) return err;
                const { password, roles, ...rest } = row;
                try {
                    if (f({
                        password: password && crypto.decrypt(password),
                        roles: roles && roles.split(","),
                        ...rest
                    })) users.push(row);
                } catch (error) {
                    debug(row);
                    debug(error);
                }
            })
            return users;
        },
        async update(user: Partial<User> & { roles?: string[] }) {
            if (!user.id) throw new Error("user.id: Required");
            const current = await byId(user.id);

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
                $disabled: (typeof user.disabled === "boolean" && user.disabled) || current.disabled,
                $email: user.email || current.email,
                $password: (user.password && crypto.encrypt(user.password)) || current.password,
                $roles: (user.roles && user.roles.join(",")) || current.roles,
            };
            const r = await db.run(sql, params);
            debug(r.sql);
            return r;
        }
    }
}