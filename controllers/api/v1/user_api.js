const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createUserSession = async function (req, res) {
  try {
    let user = await User.findOne({email: req.body.email});

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "invalid username or password",
      });
    }
    return res.json(200, {
      message: "Sucessfully logged in, keep your token safe",
      token: jwt.sign(user.toJSON(), "Jashan", { expiresIn: "1000000" }),
    });
  } catch (error) {
    console.log("********", error);
    return res.json(500, {
      message: "internal server Error",
    });
  }
};
