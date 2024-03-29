const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

// Server should be exported to be used
// in unit/integration tests
module.exports = server;
