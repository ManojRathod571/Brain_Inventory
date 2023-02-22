const mongoose = require("mongoose");

const MessageShema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: { type: String },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = MessageModel = mongoose.model("message", MessageShema);
