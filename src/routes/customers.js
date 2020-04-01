const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

/**
 * Get all customers.
 *
 * @param {string}
 * @param {callback}
 */
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

/**
 * Add a new customer.
 *
 * @param {string}
 * @param {callback}
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer(_.pick(req.body, ["name", "phone", "isGold"]));

  customer = await customer.save();
  res.send(customer);
});

/**
 * Update a customer by the given ID.
 *
 * @param {string}
 * @param {callback}
 */
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["name", "phone", "isGold"]),
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The custome with the given ID not found.");

  // Send customer
  res.send(customer);
});

/**
 * Delete a customer.
 *
 * @param {string}
 * @param {callback}
 */
router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID not found.");

  res.send(customer);
});

module.exports = router;
