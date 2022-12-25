const development = {
  name: "development",
  asset_path: "assets",
  session_cookie_key: "jashanshah",
  db: "codeial_development",
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
  jwt_secret: "Jashan",
};

const production = {
  name: "production",
};

module.exports = development;
