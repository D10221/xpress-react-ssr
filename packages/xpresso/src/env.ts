import env from "dotenv";
import { join } from "path";
const { PORT } = process.env;
env.load({
  path: join(process.cwd(), ".env")
});
process.env.PORT = PORT || process.env.PORT || "5000";
