const minimist = require('minimist');
const env = require("./config/env.config");

const args = minimist(process.argv.slice(2), {
  default: {
    PORT: env.PORT,
    mode: "fork"
  },
  alias: {
    p: "PORT",
    m: "mode"
  }
});
if(env.MODE_CLUSTER) args.mode = "cluster";

module.exports = args;