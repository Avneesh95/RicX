const User = require("../model/UserModel");
const Order = require("../model/OrderModel");

// ==============================
// Total Users
// ==============================
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

// ==============================
// Total Orders
// ==============================
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

// ==============================
// Total Revenue
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
      revenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Make User Admin / Change Role
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

module.exports = {
  getTotalUsers,
  getTotalOrders,
  getTotalRevenue,
  makeAdmin,
};