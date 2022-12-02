const express = require("express");
const passport = require("passport");
const router = express.Router();

const postController = require("../controllers/post_controller");

router.post("/create", passport.checkAuthentication, postController.createPost);
router.get(
  "/destroy",
  passport.checkAuthentication,
  postController.destroyPost
);

module.exports = router;
