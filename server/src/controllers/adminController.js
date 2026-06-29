const User = require("../model/UserModel");
const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");

// ==============================
// TOTAL USERS
// ==============================
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// TOTAL ORDERS
// ==============================
const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// TOTAL REVENUE
// ==============================
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
      revenue: result[0]?.totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// CHANGE USER ROLE (ADMIN)
// ==============================
const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// 🚀 ADMIN DASHBOARD (MAIN API)
// ==============================
const getDashboardStats = async (req, res) => {
  try {
    const [users, orders, products] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
    ]);

    const revenueResult = await Order.aggregate([
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

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      products,
      users,
      orders,
      revenue: revenueResult[0]?.totalRevenue || 0,
      recentOrders,
      latestUsers,
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
  makeAdmin,
  getDashboardStats,
};