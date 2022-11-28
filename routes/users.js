const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.profile);
router.get("/friends", userController.friends);
router.get("/signup", userController.signup);
router.get("/login", userController.login);
router.post('/create', userController.createUser);

module.exports = router;
