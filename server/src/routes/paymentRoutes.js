const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/create-order", isAuthenticated, createPaymentOrder);

router.post("/verify", isAuthenticated, verifyPayment);

module.exports = router;