const config = require("config");

/**
 * Is admin midleware.
 *
 * @params {express}
 */
module.exports = (req, res, next) => {
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
