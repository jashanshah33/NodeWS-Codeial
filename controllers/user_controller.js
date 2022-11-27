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

module.exports.signup = function (req, res) {
  return res.render("user_signup", {
    title: "signup",
  });
};

module.exports.login = function (req, res) {
  return res.render("user_login", {
    title: "Login",
  });
};