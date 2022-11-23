module.exports.profile = function (req, res) {
  return res.end("<h1>User Profile</h1>");
};

module.exports.friends = function (req, res) {
  return res.end("<h1>User Friends</h1>");
};
