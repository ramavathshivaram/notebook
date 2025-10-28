const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sentEmail = async (to, sub, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: sub,
    html: text,
  });
};

module.exports = sentEmail;
