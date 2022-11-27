module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "signup",
  });
};

module.exports.login = function (req, res) {
  return res.render("login", {
    title: "Login",
  });
};

