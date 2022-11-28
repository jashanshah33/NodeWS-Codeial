module.exports.home = function (req, res) {
  // console.log("cookies", req.cookies);
  // res.cookie("number", 30);
  return res.render("home", {
    title: "Home",
  });
};
