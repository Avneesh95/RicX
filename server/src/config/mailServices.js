const nodemailer = require("nodemailer");

// 1. Verify that the environment variables actually exist in production
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("CRITICAL: EMAIL_USER or EMAIL_PASS is missing in environment variables!");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: (process.env.EMAIL_USER || "").trim(),
    pass: (process.env.EMAIL_PASS || "").trim(),
  },
});

// 2. Add a verification step to test the SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer connection configuration error:", error);
  } else {
    console.log("Nodemailer is ready to send emails!");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `App <${process.env.EMAIL_USER.trim()}>`, // Adding a clean "From" header
      to,
      subject,
      text,
    });
    console.log("Email sent successfully! Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email via Nodemailer:", error);
    throw error; // Rethrow so your controller can handle the API response correctly
  }
};

module.exports = sendEmail;