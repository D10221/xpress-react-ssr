import { Express } from "express-serve-static-core";
import { Configuration } from "webpack";
declare function useWebpack(app: Express, config: string | Configuration): void;

export default useWebpack;
