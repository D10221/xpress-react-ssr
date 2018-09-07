import "./env";
import args from "./args";
if(typeof args.mode === "string") {
    process.env.NODE_ENV = args.mode;
    console.log("set: NODE_ENV:%s", process.env.NODE_ENV);
}
import express from "express";
import configure from "./configure";
import start from "./start";
const app = express();
/** */
async function run() {
  await configure(app);
  await start(app); 
  try {
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}
run();
