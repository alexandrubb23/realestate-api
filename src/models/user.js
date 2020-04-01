const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("@hapi/joi");

/**
 * User schema.
 *
 * @const {object}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

/**
 * Generate auth token method.
 *
 * This is called "Information Expert Principle".
 *
 * @method
 * @return string
 */
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

/**
 * Validate user.
 *
 * @param {object} user
 */
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
