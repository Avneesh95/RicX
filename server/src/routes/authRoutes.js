const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  isAuthenticated,
} = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUsers,
  verifyRegisterOtp,
  loginUser,
  forgetPassword,
  resetPassword,
  getMyProfile,
  updateProfile,
} = require("../controllers/authController");

// =========================
// AUTH ROUTES
// =========================

// Register
router.post("/register", registerUser);

// Verify OTP
router.post("/register/verify-otp", verifyRegisterOtp);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgetPassword", forgetPassword);

// Reset Password
router.post("/resetPassword", resetPassword);

// =========================
// PROFILE ROUTES
// =========================

// Get Logged-in User
router.get(
  "/me",
  isAuthenticated,
  getMyProfile
);

// Update Profile
router.put(
  "/profile",
  isAuthenticated,
  upload.single("avatar"),
  updateProfile
);

module.exports = router;