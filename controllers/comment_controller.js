const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  //console.log(req.body);
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("Error while matching Post");
      return;
    }
    if (post) {
      Comment.create(
        {
          comment: req.body.comment,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error while creating Comments");
            return;
          }
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        }
      );
    }
  });
};
