const express = require("express");
const passport = require("passport");
const router = express.Router();

const friendController = require('../controllers/friend_controller')

router.post('/toggleFriend', friendController.toggleFriend)

module.exports = router