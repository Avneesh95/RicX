const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📩 Connecting to Brevo SMTP...");

    await transporter.verify();
    console.log("✅ Brevo SMTP Connected");

    const info = await transporter.sendMail({
      from: `"RicX" <${process.env.EMAIL_SENDER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (err) {
    console.error("❌ Email Error:", err);
    throw err;
  }
};

module.exports = sendEmail;