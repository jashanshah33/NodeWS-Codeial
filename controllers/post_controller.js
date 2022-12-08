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
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      post.user = req.user;
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!",
      });
    }

    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
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

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.query.id,
          },
          message: "Post Deleted!",
        });
      }

      return res.redirect("back");
    } else {
      req.flash("error", "You can't Deleted a post");

      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
