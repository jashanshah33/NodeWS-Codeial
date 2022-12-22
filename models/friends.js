const mongoose = require("mongoose");

const friendsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Friends = mongoose.model("Friends", friendsSchema);

module.exports = Friends;
