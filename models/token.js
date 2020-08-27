const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tuser",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

module.exports = Token = mongoose.model("ttoken", tokenSchema);
