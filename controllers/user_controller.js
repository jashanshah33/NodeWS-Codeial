const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const ForgetPassword = require("../models/forgotPassword");
const crypto = require("crypto");
const queue = require("../config/kue");
const forgotPasswordEmailWorker = require("../workers/forgot_password_worker");

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
    try {
      let user = await User.findById(req.query.id);

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*******Multer Error", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "Profile Updated Successfully");
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorize!");
    return res.status(401).send("Unauthorize");
  }
};

module.exports.forgotPassowrd = async function (req, res) {
  try {
    return res.render("userForgotPassoword", {
      title: "ForgetPassword",
    });
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

//Reset User Password

module.exports.resetPassword = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    //check if user is valid
    if (user) {
      let forgetPasswordUser = await ForgetPassword.findOne({
        email: req.body.email,
      });

      // check if user did password reset in past
      if (forgetPasswordUser) {
        //if user has valid accessToken
        if (forgetPasswordUser.isValid) {
          forgetPasswordUser = await forgetPasswordUser.populate({
            path: "user",
          });

          let job = queue
            .create("forgotpasswordEmails", forgetPasswordUser)
            .save(function (err) {
              if (err) {
                console.log("error in creating a queue ");
              }

              console.log("Job enqueue", job.id);
             
            });
          return res.render("check_email", {
            title: "Email",
          });
        }

        //if user has inValid accessToken
        else {
          await ForgetPassword.findByIdAndUpdate(forgetPasswordUser._id, {
            accessToken: crypto.randomBytes(20).toString("hex"),
            isValid: true,
          });
          let user = await ForgetPassword.findById(forgetPasswordUser._id);

          user = await user.populate({
            path: "user",
          });


          let job = queue
            .create("forgotpasswordEmails", user)
            .save(function (err) {
              if (err) {
                console.log("error in creating a queue ");
              }
              console.log("Job enqueue", job.id);
            });

          return res.render("check_email", {
            title: "Email",
          });
        }
      }

      //if user forgot his/her password in past
      else {
        let newForgetPasswordUser = await ForgetPassword.create({
          email: req.body.email,
          user: user,
          accessToken: crypto.randomBytes(20).toString("hex"),
          isValid: true,
        });
        newForgetPasswordUser = await newForgetPasswordUser.populate({
          path: "user",
        });
        let job = queue
          .create("forgotpasswordEmails", newForgetPasswordUser)
          .save(function (err) {
            if (err) {
              console.log("error in creating a queue ");
            }

            console.log("Job enqueue", job.id);
          
          });
        return res.render("check_email", {
          title: "Email",
        });
      }
    }

    //if user is not valid
    else {
      req.flash("error", "User Not Found");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

module.exports.resetUserPassword = async function (req, res) {
  try {
    return res.render("user_password_reset", {
      title: "Resest Password",
    });
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

module.exports.changePassword = async function (req, res) {
  try {
    // check if password and confirmPassword Match
    if (req.body.password != req.body.confirmPassword) {
      req.flash("error", "Password and ConfirmPassword is't Matching");
      return res.redirect("back");
    } else {
      // find forgetPasswordUser
      const forgetPasswordUser = await ForgetPassword.findOne({
        accessToken: req.query.accessToken,
      });

      // console.log(forgetPasswordUser);

      //  if token is valid
      if (forgetPasswordUser.isValid) {
        await User.findByIdAndUpdate(forgetPasswordUser.user._id, {
          password: req.body.password,
        });

        await ForgetPassword.findOneAndUpdate(
          {
            accessToken: req.query.accessToken,
          },
          { isValid: false }
        );
        req.flash("success", " Password Changed Successfully");
        return res.redirect("/users/login");
      }
      //if token is not valid
      else {
        req.flash("error", "AccessToken Expired");
        return res.redirect("/users/forgetPassword");
      }
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
