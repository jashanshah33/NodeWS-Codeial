const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like.controller");

router.get("/toggle", likeController.likeToggle);

module.exports = router;
