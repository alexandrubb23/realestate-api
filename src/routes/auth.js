const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();

/**
 * User auth.
 *
 * @param {string}
 * @param {callback}
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  const invalidEmailOrPassword = () =>
    res.status(400).send("Invalid email or password.");

  if (!user) return invalidEmailOrPassword();

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) invalidEmailOrPassword();

  const token = user.generateAuthToken();
  res.send(token);
});

/**
 * Validate user auth.
 *
 * @param {object} req
 * @returns {object}
 */
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
