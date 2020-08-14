const express = require("express");
const router = express.Router();
const Post = require("../models/post");
router.post("/", async (req, res) => {
  const post = new Post({
    title: "My name is anjum",
    des: "Anjum details",
  });
  const postdata = await post.save();
  res.json(postdata);
});

module.exports = router;
