const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

module.exports = ChatModel = mongoose.model("chat", ChatSchema);
