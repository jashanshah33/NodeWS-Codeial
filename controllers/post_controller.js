const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = async function (req, res) {
  // Post.create(
  //   {
  //     content: req.body.content,
  //     user: req.user._id,
  //   },
  //   function (err, post) {
  //     if (err) {
  //       console.log("Error in creating Post");
  //       return;
  //     }

  //     return res.redirect("back");
  //   }
  // );

  try {
   await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.destroyPost = async function (req, res) {
  // Post.findById(req.query.id, function (err, post) {
  //   if (post.user == req.user.id) {
  //     post.remove();
  //     Comment.deleteMany({ post: req.query.id }, function (err, comment) {
  //       return res.redirect("back");
  //     });
  //   } else {
  //     return res.redirect("back");
  //   }
  // });

  try {
    const post = await Post.findById(req.query.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.query.id });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
