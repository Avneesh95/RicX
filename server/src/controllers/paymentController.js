const razorpay = require("../config/razorpay");
const Order = require("../model/OrderModel");

const createPaymentOrder = async (req, res) => {
  try {
    

    const { orderId } = req.body;


    const order = await Order.findById(orderId);

  

  

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    };

   

    const razorpayOrder =
      await razorpay.orders.create(options);

 
    res.status(200).json({
      success: true,
      razorpayOrder,
    });

  } catch (error) {
    

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const crypto = require("crypto");

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
        "|" +
        razorpay_payment_id
      )
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      status: "confirmed",
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.log(
      "VERIFY PAYMENT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};