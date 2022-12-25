const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat_controller");

router.post('/create', chatController.createChat)

module.exports = router