const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.likeToggle = async function (req, res) {
  // console.log(req.query.id);
  // console.log(req.query.type);
  // return res.redirect("back");

  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id);
    } else {
      likeable = await Comment.findById(req.query.id);
    }
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    // console.log('*************',existingLike);

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      let like = await Like.create({
        user: req.user,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(like);
      likeable.save();
    }

    return res.status(200).json({
      message: "Request Successfull!",
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
