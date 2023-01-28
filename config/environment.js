require("dotenv").config();
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
}  );


const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "",
  db: "",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  },
  google_client_id:
    "",
  google_client_secret: "",
  google_callback_URL: "",
  jwt_secret: "",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.SOCIALBOOK_asset_path,
  session_cookie_key: process.env.SOCIALBOOK_session_cookie_key,
  db: process.env.SOCIALBOOK_database,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SOCIALBOOK_smtpUser,
      pass: process.env.SOCIALBOOK_smtpPass,
    },
  },
  google_client_id: process.env.SOCIALBOOK_google_client_id,
  google_client_secret: process.env.SOCIALBOOK_google_client_secret,
  google_callback_URL: process.env.SOCIALBOOK_google_callback_URL,
  jwt_secret: process.env.SOCIALBOOK_jwt_secret,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
