const winston = require("winston");

/**
 * Handle express routes exception.
 *
 * @function
 */
module.exports = (err, req, res, next) => {
  winston.error(err.message, err);

  res.status(500).send("Something failed.");
};
