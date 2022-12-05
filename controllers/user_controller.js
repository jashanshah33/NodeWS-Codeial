const User = require("../models/user");

module.exports.profile = async function (req, res) {
  // User.findById(req.query.id, function (err, user) {
  //   return res.render("userProfile", {
  //     title: "Profile",
  //     profileUser: user,
  //   });
  // });

  try {
    const user = await User.findById(req.query.id);
    return res.render("userProfile", {
      title: "Profile",
      profileUser: user,
    });
  } catch (error) {
    req.flash("error", error);
    return;
  }
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

module.exports.createUser = async function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "Password and confirmPassword is't matching");
    return res.redirect("back");
  }

  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("Error while finding user");
  //     return res.redirect("/users/signup");
  //   }
  //   if (!user) {
  //     User.create(req.body, function (err, user) {
  //       if (err) {
  //         console.log("Error while creating user in signup");
  //         return res.redirect("/users/signup");
  //       }
  //     });
  //     return res.redirect("/users/login");
  //   }
  //   return res.redirect("back");
  // });

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      req.flash("success", "Registered Successfully");

      return res.redirect("/users/login");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};

module.exports.createUserSession = function (req, res) {
  req.flash("success", "Loged in Successfully");

  return res.redirect("/");
};

module.exports.destroyUserSession = function (req, res) {
  req.logout(function (err, user) {
    req.flash("success", "Loged out sucessfully");
    return res.redirect("/users/login");
  });
};

module.exports.updateUser = async function (req, res) {
  if (req.user.id == req.query.id) {
    // User.findByIdAndUpdate(req.query.id, req.body, function (err, user) {
    //   return res.redirect("back");
    // });

    await User.findByIdAndUpdate(req.query.id, req.body);
    req.flash("success", "User Details Updated Successfully");

    return res.redirect("back");
  } else {
    return res.status(401).send("Unauthorize");
  }
};
