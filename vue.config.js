const backend = require("./build/dev-server.js");
module.exports = {
  devServer: {
    before: backend,
  },
};
