const express = require("express");
const router = express.Router();
const passport = require("passport");

const likeController = require("../controllers/like.controller");

router.post("/toggle", passport.checkAuthentication, likeController.likeToggle);

module.exports = router;
