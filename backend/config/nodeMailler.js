const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sentEmail = (to, sub, text) => {
  transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: sub,
    html: text,
  });
};

module.exports = sentEmail;
