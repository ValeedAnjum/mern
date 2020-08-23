const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  imageurl: {
    type: String,
  },
});

module.exports = Picture = mongoose.model("tPicture", pictureSchema);
