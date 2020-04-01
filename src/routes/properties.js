const express = require("express");
const { Property, validate } = require("../models/property");
const { Category } = require("../models/category");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
 * Get all properties.
 *
 * @param {string}
 * @param {callback}
 */
router.get("/", async (req, res) => {
  const properties = await Property.find().sort("name");

  res.send(properties);
});

/**
 * Get a property by the given ID.
 *
 * @param {string}
 * @param {callback}
 */
router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property)
    return res.status(404).send("The property with the given ID not found.");

  res.send(property);
});

/**
 * Add a new property.
 *
 * @param {midleware}
 * @param {callback}
 */
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const property = new Property(mapPropertyToObject(category, req));

  await property.save();
  res.send(property);
});

/**
 * Update an existing property by the given ID.
 *
 * @param {midleware}
 * @param {callback}
 */
router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  let property = await Property.findByIdAndUpdate(
    req.params.id,
    mapPropertyToObject(category, req),
    { new: true }
  );

  if (!property)
    res.status(404).send("The property with the given ID not found.");

  property.name = req.body.name;
  property.description = req.body.description;

  res.send(property);
});

/**
 * Delete an existing property by the given ID.
 *
 * @param {midleware}
 * @param {callback}
 */
router.delete("/:id", [auth, admin], async (req, res) => {
  // Look up the property
  const property = await Property.findByIdAndDelete(req.params.id);

  // If not exist, return 404 - Not Found
  if (!property)
    return res.status(404).send("The property with the given ID not found.");

  // Send deleted property
  res.send(property);
});

/**
 * Map a property to an object.
 *
 * @param {object} category
 * @param {object} req
 */
function mapPropertyToObject(category, req) {
  return {
    title: req.body.title,
    category: {
      // every 2 characters represent a byte
      // 12 bytes to uniq the identifier in mongodb
      // 4 bytes: timestamp (same seconds)
      // 3 bytes: machine identifier (same machine)
      // 2 bytes: process identifier (same process)
      // 3 bytes: counter
      // 1 byte = 8 bits
      // 2 ^ 8 = 256
      // 2 ^ 24 = 16M
      // (and we generates more than 16M documents the
      // counter will overflow and that where we end with two same documents id)
      _id: category._id,
      name: category.name
    },
    description: req.body.description,
    location: {
      coordinates: {
        lat: req.body.lat,
        lng: req.body.lng
      }
    },
    price: req.body.price,
    currency: req.body.currency,
    images: req.body.images
  };
}

module.exports = router;
