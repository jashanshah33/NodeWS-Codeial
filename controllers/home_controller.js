module.exports.home = function (req, res) {
  return res.end("<h1>Home Page</h1>");
};

module.exports.about = function (req, res) {
  return res.end("<h1>about Page</h1>");
};
