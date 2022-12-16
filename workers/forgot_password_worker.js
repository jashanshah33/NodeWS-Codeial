const queue = require("../config/kue");
const forgotPasswordMailer = require("../mailers/forgot_password_mailer");

queue.process("forgotpasswordEmails", function (job, done) {
  console.log("emails workers is processing a job", job.data);

  forgotPasswordMailer.forgetPassword(job.data);

  done();
});