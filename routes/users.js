const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/signup", userController.signup);
router.get("/login", userController.login);
router.post("/create", userController.createUser);

router.post(
  "/create_session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.createUserSession
);

router.get("/logout", userController.destroyUserSession);
router.post("/update", passport.checkAuthentication, userController.updateUser);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  userController.createUserSession
);

module.exports = router;
