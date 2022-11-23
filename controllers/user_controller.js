module.exports.profile = function (req, res) {
  return res.render("userProfile", {
    title: "Profile",
  });
};

module.exports.friends = function (req, res) {
  return res.render("userFriends", {
    title: "Friends",
  });
};
