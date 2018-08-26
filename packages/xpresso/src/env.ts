import env from "dotenv";
import { join } from "path";
env.load({
  path: join(process.cwd(), ".env")
});
