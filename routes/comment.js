const express = require("express");
const passport = require("passport");
const router = express.Router();

const commentController = require("../controllers/comment_controller");

router.post(
  "/createComment",
  passport.checkAuthentication,
  commentController.createComment
);

module.exports = router;
