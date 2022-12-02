const express = require("express");
const passport = require("passport");
const router = express.Router();

const commentController = require("../controllers/comment_controller");

router.post(
  "/createComment",
  passport.checkAuthentication,
  commentController.createComment
);

router.get(
  "/destroy",
  passport.checkAuthentication,
  commentController.destroyComment
);

module.exports = router;
