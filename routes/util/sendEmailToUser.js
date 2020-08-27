const config = require("config");
const nodemailer = require("nodemailer");

module.exports.sendEmailToUser = function (res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("email"),
      pass: config.get("pass"),
    },
  });

  const mailOptions = {
    from: "noreplay@gmail.com",
    to: "valeedanjumsiddiqui@gmail.com",
    subject: "Sending Email using Node.js",
    html: '<h1 style="color: blue;">no was easy!</h1>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email send to user");
    }
  });
};
