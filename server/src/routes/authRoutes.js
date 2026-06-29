const express = require("express");
const router = express.Router();


const {
  registerUser,
  verifyRegisterOtp,
  loginUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/register/verify-otp", verifyRegisterOtp);

router.post("/login", loginUser);

router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;