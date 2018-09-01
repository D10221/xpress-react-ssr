import env from "dotenv";
import { join } from "path";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log("NODE_ENV: %s", process.env.NODE_ENV);
env.load({
  path: join(process.cwd(), ".env")
});
