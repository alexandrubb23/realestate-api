/**
 * Handle async errors in express routs log.
 *
 * @function
 */
module.exports = handler => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
