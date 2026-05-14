const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: process.env.BREVO_SERVER,
  port: process.env.BREVO_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_API_KEY,
  },
});

const sentEmail = async (to, sub, text) => {
  await transporter.sendMail({
    from: `"AI NOTEBOOK" <${process.env.BREVO_USER}>`,
    to: to,
    subject: sub,
    html: text,
  });
};

module.exports = sentEmail;