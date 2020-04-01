/**
 * Logging middleware.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const log = (req, res, next) => {
  console.log("Loggind...");
  next();
};

module.exports = log;
