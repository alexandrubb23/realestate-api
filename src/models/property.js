const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { categorySchema } = require("./category");

/**
 * Create a mongoose schema properties.
 *
 * @var {object}
 */
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: categorySchema,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: {
      type: Object
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "EUR", "RON"]
  },
  images: Array
});

// Compile properties schema into a model
const Property = mongoose.model("Property", propertySchema);

/**
 * Validate a property.
 *
 * @param {opbect} property
 * @return object
 */
function validateProperty(property) {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    categoryId: Joi.objectId().required(),
    description: Joi.string()
      .min(5)
      .max(500)
      .required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    price: Joi.number().required(),
    currency: Joi.string()
      .min(3)
      .max(3)
      .required(),
    images: Joi.array()
  });

  return schema.validate(property);
}

exports.Property = Property;
exports.validate = validateProperty;

// this async validator is just for demostrating of
// how we can validate an asyncronous call using the "callback" pattern:
// coordinates: {
//   type: Array,
//   validate: {
//     isAsync: true,
//     validator: function(v, callback) {
//       setTimeout(() => {
//         const result = v && v.length === 3;
//         callback(result);
//       }, 4000);
//     },
//     message: "A property should have latitude and longitude"
//   }
// }
