const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { generateVerificationEmail } = require("../templates/emailTemplate");

dotenv.config();

const sendVerificationEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // ✅ correct host
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // ✅ Helps with Railway's network setup
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,
  });

  console.log("Attempting SMTP connection...");
  try {
    await transporter.verify();
    console.log("SMTP works!");
  } catch (error) {
    console.log("SMTP blocked:", error.message);
  }
  await transporter.sendMail({
    from: `"TASUKU" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify your TASUKU account",
    html: generateVerificationEmail(code),
  });
};

module.exports = { sendVerificationEmail };
