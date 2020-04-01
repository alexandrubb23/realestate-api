const jwt = require("jsonwebtoken");
const config = require("config");
const jwtFirebase = require("../utils/verifyFirebaseToken");

/**
 * Authorization middleware.
 *
 * @param {express}
 */
module.exports = async (req, res, next) => {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denided. No token provided.");

  let decoded;

  try {
    decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    try {
      decoded = await jwtFirebase(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send("Invalid token.");
    }
  }
};
