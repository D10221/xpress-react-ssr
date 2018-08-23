const isDev = process.env.NODE_ENV !== "production";
if(isDev){
  module.exports = require("./webpack.dev.config");  
} else {
  module.exports = require("./webpack.prod.config");  
}