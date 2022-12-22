const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATOR_path = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    friends:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friends'
    }]
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATOR_path));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATOR_path;


const User = mongoose.model("User", userSchema);

module.exports = User;
