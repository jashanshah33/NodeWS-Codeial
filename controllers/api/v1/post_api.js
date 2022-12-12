const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });
  return res.json({
    message: "Version 1 is working",
    posts: posts,
  });
};

module.exports.destroyPost = async function (req, res) {
  try {
    const post = await Post.findById(req.query.id);
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.query.id });

      return res.json(200, {
        message: "Post Deleted Successfully",
      });
    } else {
      return res.json(401, {
        message: "Yoy can't delete this post",
      });
    }
  } catch (error) {
    console.log("********", error);
    return res.json(500, {
      message: "internal server Error",
    });
  }
};
