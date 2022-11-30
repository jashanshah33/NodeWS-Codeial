const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("userProfile", {
    title: "Profile",
  });
};

module.exports.friends = function (req, res) {
  return res.render("userFriends", {
    title: "Friends",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", {
    title: "signup",
  });
};

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_login", {
    title: "Login",
  });
};

module.exports.createUser = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirmPassword) {
    console.log("Password and confirmPassword is't matching");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error while finding user");
      return res.redirect("/users/signup");
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error while creating user in signup");
          return res.redirect("/users/signup");
        }
      });
      return res.redirect("/users/login");
    }
    return res.redirect("back");
  });
};

module.exports.createUserSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.destroyUserSession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    return res.redirect("/users/login");
  });
};
