import "./env";
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
