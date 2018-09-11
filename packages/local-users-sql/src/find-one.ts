import { User } from "./types";
import db from "@local/db";
/** */
export default async function findOne(where: string): Promise<User> {
  const r = await (await db).get(`select * from users where ${where}`);
  return r;
}