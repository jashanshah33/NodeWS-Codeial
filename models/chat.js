const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat