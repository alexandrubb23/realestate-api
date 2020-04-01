const mongoose = require("mongoose");

/**
 * Image schema.
 *
 * @const {object}
 */
const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  })
);

exports.Image = Image;
