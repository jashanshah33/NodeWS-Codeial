const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creating Post");
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.destroyPost = function (req, res) {
  // console.log("working");
  // console.log(req.query.id);
  // return res.redirect("back");

  Post.findById(req.query.id, function (err, post) {
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.query.id }, function (err, comment) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
