const pkg = require("../package.json");
const SERVICE_NAME = pkg.name;
const SERVICE_DESCRIPTION = pkg.description;
const ENTRY_POINT = pkg.main;
module.exports = {
  ENTRY_POINT,
  SERVICE_NAME,
  SERVICE_DESCRIPTION
};
