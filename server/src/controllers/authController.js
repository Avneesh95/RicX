const sendEmail = require("../config/mailServices");
const User = require("../model/UserModel");
const OTP = require("../model/OtpModel"); // ✅ FIXED (you were missing this)
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* =========================
   REGISTER (SEND OTP ONLY)
========================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Delete previous OTP (if any)
    await OTP.deleteMany({ email });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash password BEFORE storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save temporary registration data
    await OTP.create({
      name,
      email,
      password: hashedPassword,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP email
    await sendEmail(
      email,
      "Email Verification OTP",
      `Your OTP is ${otp}. It expires in 10 minutes.`
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   VERIFY OTP + CREATE USER
========================= */
const verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await OTP.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user using already hashed password
    await User.create({
      name: record.name,
      email: record.email,
      password: record.password,
    });

    // Delete OTP record
    await OTP.deleteOne({ email });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   LOGIN
========================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. It expires in 10 minutes.`
    );

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   RESET PASSWORD
========================= */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  registerUser,
  verifyRegisterOtp, // ✅ IMPORTANT
  loginUser,
  forgetPassword,
  resetPassword,
};