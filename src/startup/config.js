const config = require("config");

/**
 * Throw an error if jwtPrivateKey is not defined.
 */
module.exports = () => {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
