const mongoose = require("mongoose");

// Our Schema
const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
      }
    ],
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", MessageSchema);
