require("express-async-errors");
const config = require("config");
const winston = require("winston");
// require("winston-mongodb");

module.exports = () => {
  // Log uncaughtExceptions errors.
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: "logs/uncaughtExceptions.log",
      level: "error"
    })
  );

  // Log info messages.
  // winston.add(
  //   new winston.transports.Console({
  //     colorize: true,
  //     prettyPrint: true,
  //     level: "info"
  //   })
  // );

  // Log error into DB.
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: config.get("db.host"),
  //     level: "error",
  //     handleExceptions: true
  //   })
  // );

  /**
   * This is a trick because unhandledRejection
   * does't work properly.
   *
   * Will work only if we assign an object
   * e.g Object.assign(winston, { unhandledRejection: true })
   */
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
