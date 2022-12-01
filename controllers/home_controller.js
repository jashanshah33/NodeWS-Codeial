const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // console.log("cookies", req.cookies);
  // res.cookie("number", 30);
  Post.find({}).populate('user').exec(function(err, post){
    if (err) {
      console.log("Error while fetching posts.");
    }
    return res.render('home',{
      title:'Home',
      posts:post
    })
  })
};
