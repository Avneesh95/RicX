const nodemailer = require("nodemailer");
const dns = require("dns");

// Force IPv4 resolution to prevent connection timeouts (ENETUNREACH / ETIMEDOUT)
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be a 16-character App Password
  },
  tls: {
    // Prevents failures due to local self-signed or unauthorized certificates
    rejectUnauthorized: false, 
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📩 Starting email...");

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
    return info; // Return info so the calling function knows it succeeded
  } catch (err) {
    console.error("❌ Email Error:", err);
    throw err;
  }
};

module.exports = sendEmail;