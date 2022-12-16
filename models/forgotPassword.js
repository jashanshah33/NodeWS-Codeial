const mongoose = require("mongoose");

const forgetPasswordSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accessToken: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

const ForgetPassword = mongoose.model("ForgotPassoword", forgetPasswordSchema);

module.exports = ForgetPassword;
