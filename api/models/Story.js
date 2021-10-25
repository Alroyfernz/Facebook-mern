const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    profile: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
