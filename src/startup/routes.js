const cors = require("cors");
const error = require("../middleware/error");
const express = require("express");
const categories = require("../routes/categories");
const customers = require("../routes/customers");
const users = require("../routes/users");
const auth = require("../routes/auth");
const properties = require("../routes/properties");
const media = require("../routes/media");

module.exports = function(app) {
  app.use(cors());
  app.use(express.static("public"));

  /**
   * The json middleware function will be read the request
   * and if is there is a json object in the body of the request,
   * will be parse the body of the request into a json object, and then
   * it will set "req.body"
   */
  app.use(express.json());

  app.use("/api/categories", categories);
  app.use("/api/customers", customers);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/properties", properties);
  app.use("/api/media", media);
  app.use(error);
};
