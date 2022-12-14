const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "209353265520-nl3qb24gfh5rtb8r03ve2c2ueofut8pb.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          return console.log("Error in google strategy-passport");
        }
        //console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                return console.log("Error creating User by google passport");
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
