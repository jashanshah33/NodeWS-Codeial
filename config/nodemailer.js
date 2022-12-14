const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "webdeveloperpb18@gmail.com",
    pass: "olcwnklsgytumcln",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        return console.log("error in rendering template");
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports={
  transporter: transporter,
  renderTemplate : renderTemplate
}