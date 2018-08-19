import express from "express";
import { join } from "path";
import render from "./render";
const app = express();

app.use("/static", express.static(join(__dirname, "../static")));
app.get("/", render());

const port = Number(process.env.PORT) || 5000;
app.listen(port, (error: Error) => {
  if (error) {
    console.error(error);
    return process.exit(-1);
  }
  console.log("Express listening on port: %s", port);
});
