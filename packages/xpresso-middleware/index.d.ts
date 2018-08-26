import { Express } from "express-serve-static-core";
import { Configuration } from "webpack";
/**
 * 
 * @param app Express App
 * @param config Webpack configuration or path to Webpack configuration
 */
declare function useWebpack(app: Express, config: string | Configuration): void;

export default useWebpack;
