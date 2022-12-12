module.exports.index = function (req, res) {
  return res.json({
    message: "Version 2 is working",
    posts: [],
  });
};
