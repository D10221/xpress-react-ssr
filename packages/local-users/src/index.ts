import find from "./find";
import init from "./init";
import add from "./add";
import all from "./all";
import findOne from "./find-one";
import update from "./update";
import remove from "./remove";
export * from "./types";

const users = {
  add,
  all,
  remove,
  find,
  findOne,
  findById: (id: string) => findOne(`id = '${id}'`),
  update
};

export type Users = typeof users;

/** */
export default init.then(_ => users);
