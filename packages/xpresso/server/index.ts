import "./env";
import{ Express } from "express-serve-static-core";
import express from "express";
import configure from "./configure";
import start from "./start";
import { hostName, port } from "./config";
let app: Express;
/** */
export async function run() {
  try {
    app = express();
    app = await configure(app);
    app = await start(app);
    console.log("Express listening on %s:%s", hostName, port);
  } catch (error) {
    console.error(error);
    return process.exit(-1);
  }
}
run();