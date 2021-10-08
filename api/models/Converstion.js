const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    member: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
