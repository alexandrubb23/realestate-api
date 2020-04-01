const { Image } = require("../models/image");
const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

/**
 * Get all image.
 *
 * @param {string}
 * @param {callback}
 */
router.get("/", async (req, res) => {
  const images = await Image.find().sort("name");

  // In a real world application never do this!!
  images.map(image => (image.src = `${mediaFiles(req)}${image.src}`));

  res.send(images);
});

/**
 * Add a new image.
 *
 * @param {string}
 * @param {callback}
 */
router.post("/", [auth, upload], async (req, res) => {
  let image = new Image({
    name: req.file.originalname,
    src: req.file.filename
  });

  image = await image.save();
  image.src = `${mediaFiles(req)}${image.src}`;

  res.send(image);
});

/**
 * Media files path url.
 *
 * @param {object} req
 * @returns {string}
 */
function mediaFiles(req) {
  return `${req.protocol}://${req.get("host")}/upload/`;
}

module.exports = router;
