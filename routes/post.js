const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../models/post");
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("des", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, des } = req.body;
    const post = new Post({
      title,
      des,
    });
    try {
      const postdata = await post.save();
      res.json(postdata);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
