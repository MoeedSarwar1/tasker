const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { generateVerificationEmail } = require("../templates/emailTemplate");

dotenv.config();

const sendVerificationEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"TASUKU" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify your TASUKU account",
    html: generateVerificationEmail(code),
  });
};

module.exports = { sendVerificationEmail };
