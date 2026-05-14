require("dotenv").config();

const nodeMailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sentEmail = async (to, sub, text) => {
  await transporter.sendMail({
    from: `"AI NOTEBOOK" <${process.env.BREVO_USER}>`,
    to,
    subject: sub,
    html: text,
  });
};

module.exports = sentEmail;
