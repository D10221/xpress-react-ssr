import Debug from "debug";
import { Database } from "sqlite";
import { User } from "./types";
import { join } from "path";

const debug = Debug(
  `${require(join(__dirname, "..", "package.json")).name}/find`
);

export type Predicate = (x: Partial<User>) => boolean;

export interface Find {
  (test: Predicate): Promise<User[]>;
  (where: string): Promise<User[]>;
  (filter: string, test: Predicate): Promise<User[]>;
  (test: Predicate, filter: string): Promise<User[]>;

}

export default function(
  db: Database,
  crypto: { decrypt: (text: string) => string }
) {
  /** */
  const find: Find = async (...args: any[]) => {
    const filter: string = args.find(arg => typeof arg == "string");
    const test: Predicate =
      args.find(arg => typeof arg == "function") || (() => true);

    if (!filter && !test)
      return Promise.reject(new Error("Invalid arguments "));

    const query = `select * from users ${(filter && ` WHERE ${filter}`) || ""}`;
    debug("query: %s", query);

    let users: User[] = [];
    await db.each(query, (err, row) => {
      if (err) return err;
      const { password, roles, ...rest } = row;
      try {
        if (
          test({
            password: password && crypto.decrypt(password),
            roles: roles && roles.split(","),
            ...rest
          })
        )
          users.push(row);
      } catch (error) {
        debug(row, error);
        throw error;
      }
    });
    return users;
  };
  return find;
}
