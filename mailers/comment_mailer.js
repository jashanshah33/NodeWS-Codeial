const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("inside newComment mailer");

  nodemailer.transporter.sendMail(
    {
      from: "webdeveloperpb18@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: "<h1>Yup, your comment is now published!</h1>",
    },
    (err, info) => {
      if (err) {
        return console.log("Error in sending emails", err);
      }

      console.log(info);
    }
  );
};
