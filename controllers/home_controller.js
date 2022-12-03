const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // console.log("cookies", req.cookies);
  // res.cookie("number", 30);
  Post.find({})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .exec(function (err, post) {
      if (err) {
        console.log("Error while fetching posts.");
      }
      User.find({}, function (err, user) {
        return res.render("home", {
          title: "Home",
          posts: post,
          allUsers: user
        });
      });
    });
};
