const User = require("../models/user");
const Friends = require("../models/friends");

module.exports.toggleFriend = async function (req, res) {
  try {
    let currentUser = await User.findById(req.user._id);
    let friendRemoved = false;
    let extistingFriend = await Friends.findOne({
      user: req.user._id,
      user_to: req.query.id,
    });
    // console.log('**************',extistingFriend);

    if (extistingFriend) {
      currentUser.friends.pull(extistingFriend._id); 
      currentUser.save();
      extistingFriend.remove();
      friendRemoved = true
      req.flash("success", "Friend Removed");
    } else {
      let newFriend = await Friends.create({
        user: req.user._id,
        user_to: req.query.id,
      });
      currentUser.friends.push(newFriend);
      currentUser.save();
      req.flash("success", "Friend Added");
    }

    return res.status(200).json({
        message: "Request Successfull!",
        data: {
            friendRemoved: friendRemoved,
        },
      });
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
