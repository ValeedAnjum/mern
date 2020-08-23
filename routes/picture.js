const express = require("express");
const router = express.Router();
const Picture = require("../models/picture");
const auth = require("../middleware/auth");

// @route post
//@des post image url
//access private
router.post("/", auth, async (req, res) => {
  const { imageurl } = req.body;
  const picture = new Picture({
    imageurl,
  });
  await picture.save();
  res.json(picture);
});

module.exports = router;
