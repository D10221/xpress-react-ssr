import { User } from "./types";
import Debug from "debug";
import pkg from "./pkg";
import db from "@local/db";

const debug = Debug(
  `${pkg.name}/find`
);

export type Predicate = (x: Partial<User>) => boolean;

export interface Find {
  (test: Predicate): Promise<User[]>;
  (where: string): Promise<User[]>;
  (filter: string, test: Predicate): Promise<User[]>;
  (test: Predicate, filter: string): Promise<User[]>;

}
const find: Find = async (...args: any[]) => {

  const filter: string = args.find(arg => typeof arg == "string");
  const test: Predicate =
    args.find(arg => typeof arg == "function") || (() => true);

  if (!filter && !test)
    return Promise.reject(new Error("Invalid arguments "));

  const query = `select * from users ${(filter && ` WHERE ${filter}`) || ""}`;
  debug("query: %s", query);
  const { default: crypto } = await import("./crypto");
  let users: User[] = [];
  await (await db).each(query, (err, row) => {
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
export default find;