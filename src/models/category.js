const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

/**
 * Category schema.
 *
 * @const {object}
 */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  }
});

/**
 * Compile schema into a "model".
 *
 * A model is like a class, it's a blueprint for creating objects:
 *
 * @const {object}
 */
const Category = mongoose.model("Category", categorySchema);

/**
 * Validate a category.
 *
 * @param {object} category
 * @return object
 */
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  });

  return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
