const multer = require("multer");
const config = require("config");

/**
 * File upload.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
module.exports = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.get("upload.path"));
    }
  });

  const upload = multer({ storage }).single("file");

  return upload(req, res, () => {
    return next();
  });
};
