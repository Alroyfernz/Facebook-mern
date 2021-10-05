const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  photoURL: { type: String, default: "" },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
