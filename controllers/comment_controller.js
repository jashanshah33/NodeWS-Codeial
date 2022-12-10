const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async function (req, res) {
  //console.log(req.body);
  // Post.findById(req.body.post, function (err, post) {
  //   if (err) {
  //     console.log("Error while matching Post");
  //     return;
  //   }
  //   if (post) {
  //     Comment.create(
  //       {
  //         comment: req.body.comment,
  //         post: req.body.post,
  //         user: req.user._id,
  //       },
  //       function (err, comment) {
  //         if (err) {
  //           console.log("Error while creating Comments");
  //           return;
  //         }
  //         post.comments.push(comment);
  //         post.save();
  //         return res.redirect("back");
  //       }
  //     );
  //   }
  // });

  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        comment: req.body.comment,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      if (req.xhr) {
        comment.user = req.user;
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Added!",
        });
      }

      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};

module.exports.destroyComment = async function (req, res) {
  // Comment.findById(req.query.id, function (err, comment) {
  //   Post.findById(comment.post, function (err, post) {
  //     if (comment.user == req.user.id || post.user == req.user.id) {
  //       let postId = comment.post;
  //       comment.remove();
  //       Post.findByIdAndUpdate(
  //         postId,
  //         { $pull: { comments: req.query.id } },
  //         function (err, post) {
  //           return res.redirect("back");
  //         }
  //       );
  //     } else {
  //       return res.redirect("back");
  //     }
  //   });
  // });

  try {
    const comment = await Comment.findById(req.query.id);

    const post = await Post.findById(comment.post);

    if (comment.user == req.user.id || post.user == req.user.id) {
      let postId = await comment.post;
      comment.remove();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.query.id },
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.query.id,
          },
          message: "Comment Deleted!",
        });
      }
      return res.redirect("back");
    } else {
      req.flash("error", "You can not delete a comment");

      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
