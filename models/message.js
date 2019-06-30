const mongoose = require("mongoose");

// Our Schema
const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", MessageSchema);
