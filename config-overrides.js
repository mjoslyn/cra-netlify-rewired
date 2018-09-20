const { compose } = require("react-app-rewired");
const rewirePurs = require("./purs-loader");

module.exports = function(config, env) {
  const rewires = compose(rewirePurs);
  return rewires(config, env);
};
