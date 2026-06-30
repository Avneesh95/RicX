const razorpay = require("../config/razorpay");
const Order = require("../model/OrderModel");
const crypto = require("crypto");

// =========================
// CREATE PAYMENT ORDER
// =========================
const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    console.log("🔍 ORDER ID:", orderId);

    const order = await Order.findById(orderId);

    console.log("📦 ORDER:", order);
    console.log("💰 TOTAL AMOUNT:", order?.totalAmount);

    // =========================
    // VALIDATIONS
    // =========================
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.totalAmount || order.totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const amount = Math.round(order.totalAmount * 100);

    const options = {
      amount,
      currency: "INR",
      receipt: order._id.toString(),
    };

    // =========================
    // CREATE RAZORPAY ORDER
    // =========================
    const razorpayOrder = await razorpay.orders.create(options);

    console.log("✅ RAZORPAY ORDER:", razorpayOrder);

    // save razorpay order id in DB
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("❌ CREATE PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Payment order creation failed",
    });
  }
};

// =========================
// VERIFY PAYMENT
// =========================
const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      order.paymentStatus = "failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // =========================
    // PAYMENT SUCCESS
    // =========================
    order.paymentStatus = "paid";
    order.status = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log("❌ VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Verification failed",
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};