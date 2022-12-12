const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  secretOrKey: "Jashan",
};

passport.use(
  new jwtStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        return console.log("Error in finding user from JWT", err);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

module.exports = passport