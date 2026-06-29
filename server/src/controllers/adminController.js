const User = require("../model/UserModel");
const Order = require("../model/OrderModel");

// Total Users
const getTotalUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Total Orders
const getTotalOrders = async (req, res) => {
  try {
    const count = await Order.countDocuments();

    res.status(200).json({
      success: true,
      totalOrders: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Total Revenue (Optimized)
const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      revenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTotalUsers,
  getTotalOrders,
  getTotalRevenue,
};