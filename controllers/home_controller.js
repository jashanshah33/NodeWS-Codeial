const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // Post.find({})
  //   .populate("user")
  //   .populate({ path: "comments", populate: { path: "user" } })
  //   .exec(function (err, post) {
  //     if (err) {
  //       console.log("Error while fetching posts.");
  //     }
  //     User.find({}, function (err, user) {
  //       return res.render("home", {
  //         title: "Home",
  //         posts: post,
  //         allUsers: user
  //       });
  //     });
  //   });

  //using async await
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });
    for (const p of posts) {
      p.comments.reverse();
    }

    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: posts,
      allUsers: users,
    });
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
