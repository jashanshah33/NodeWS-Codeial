const nodemailer = require("../config/nodemailer");

exports.forgetPassword = (forgetPasswordUser) => {
  //console.log("inside newComment mailer");

  const htmlString = nodemailer.renderTemplate(
    { forgetPasswordUser: forgetPasswordUser },
    "/forgotPassword/forgotPassword.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "webdeveloperpb18@gmail.com",
      to: forgetPasswordUser.user.email,
      subject: "Reset password email",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        return console.log("Error in sending emails", err);
      }

      // console.log(info);
    }
  );
};
