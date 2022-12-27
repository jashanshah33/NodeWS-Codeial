require("dotenv").config();

const development = {
  name: "development",
  asset_path: "assets",
  session_cookie_key: "jashanShah",
  db: "socialBook_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "webdeveloperpb18@gmail.com",
      pass: "olcwnklsgytumcln",
    },
  },
  google_client_id:
    "209353265520-nl3qb24gfh5rtb8r03ve2c2ueofut8pb.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "JashanSHah",
};

const production = {
  name: "production",
  asset_path: process.env.asset_path,
  session_cookie_key: process.env.session_cookie_key,
  db: process.env.db,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.smtpUser,
      pass: process.env.smtpPass,
    },
  },
  google_client_id: process.env.google_client_id,
  google_client_secret: process.env.google_client_secret,
  google_callback_URL: process.env.google_callback_URL,
  jwt_secret: process.env.jwt_secret,
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
