import { Express } from "express-serve-static-core";
import { Configuration } from "webpack";
/**
 *
 * @param app Express App
 * @param config Webpack configuration or Requireable path to Webpack configuration
 * @param options {{devMiddlewareOptions, hotMiddlewareOptions}}
 */
declare function useWebpack(
  app: Express,
  config: string | Configuration,
  options?: Partial<{
    devMiddlewareOptions: Partial<import("webpack-dev-middleware").Options>;
    hotMiddlewareOptions: Partial<import("webpack-hot-middleware").Options>;
  }>
): Express;

export default useWebpack;
