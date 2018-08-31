const colors = require("ansi-colors");
/**
 * @param { typeof console.log } log;
 * @returns {{ info: typeof console.log, err: typeof console.log, warn: typeof console.log}}
 */
module.exports = log => ({
  info(message, ...args) {
    return log(colors.blueBright(message), ...args);
  },
  err(message, ...args) {
    return log(colors.redBright(message), ...args);
  },
  warn(message, ...args) {
    return log(colors.yellowBright(message), ...args);
  }
});
