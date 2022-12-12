module.exports.index = function (req, res) {
  return res.json({
    message: "Version 1 is working",
    posts: [],
  });
};
