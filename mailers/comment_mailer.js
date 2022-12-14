const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  //console.log("inside newComment mailer");

  const htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comments.ejs')

  nodemailer.transporter.sendMail(
    {
      from: "webdeveloperpb18@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        return console.log("Error in sending emails", err);
      }

      console.log(info);
    }
  );
};
