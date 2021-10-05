const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  photoURL: { type: String },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comment", commentSchema);
