const nodemailer = require("nodemailer");

// 🟢 THE ULTIMATE FIX FOR RENDER: 
// Hardcode Google's standard IPv4 SMTP address. 
// This completely stops Node from trying to resolve the failing IPv6 route.
const transporter = nodemailer.createTransport({
  host: "74.125.142.108", // This is the direct IPv4 address for smtp.gmail.com
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Reminder: Must be a 16-character App Password
  },
  tls: {
    // 👑 CRITICAL: Since we are using an IP address instead of "smtp.gmail.com",
    // Gmail's SSL certificate will complain about a name mismatch. 
    // This line tells Nodemailer it's okay to trust it anyway.
    servername: "smtp.gmail.com",
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📩 Starting email via direct IPv4 channel...");

    await transporter.verify();
    console.log("✅ SMTP Connected successfully via IPv4");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email Error:", err);
    throw err;
  }
};

module.exports = sendEmail;