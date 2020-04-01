const config = require("config");
const mongoose = require("mongoose");
const winston = require("winston");

/**
 * Connect to MongoDB.
 */
module.exports = () => {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
