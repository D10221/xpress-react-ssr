const colors = require("ansi-colors");
/**
 * @param { typeof console.log } log;
 * @param options {{ devOnly: boolean}}
 * @returns {{ info: typeof console.log, err: typeof console.log, warn: typeof console.log, disabled: boolean}}
 */
module.exports = (log, options) => {
  const devOnly = options && !!options.devOnly;
  const isDev = process.env.NODE_ENV !== "production";
  const disabled = devOnly && !isDev;
  return {
    disabled,
    info(message, ...args) {
      !disabled && log(colors.blueBright(message), ...args);
    },
    err(message, ...args) {
      !disabled && log(colors.redBright(message), ...args);
    },
    warn(message, ...args) {
      !disabled && log(colors.yellowBright(message), ...args);
    }
  };
};
