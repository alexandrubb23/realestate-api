const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

/**
 * Get all categories.
 *
 * @param {string}
 * @param {callback}
 */
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");

  res.send(categories);
});

/**
 * Get a category by the given id.
 *
 * @param {string}
 * @param {middleware} Validate Mongoose object ID
 * @param {callback}
 */
router.get("/:id", validateObjectId, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

/**
 * Add a new category.
 *
 * @param {string}
 * @param {middleware} Authorize
 * @param {callback}
 */
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name
  });

  category = await category.save();
  res.send(category);
});

/**
 * Add a category by the given ID.
 *
 * @param {string}
 * @param {middleware} Authorize and validate Mongoose obj ID
 * @param {callback}
 */
router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

/**
 * Delete a category by the given ID.
 *
 * @param {string}
 * @param {middleware} Authorize, Admin and valid Mongoose Object ID
 * @param {callback}
 */
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
