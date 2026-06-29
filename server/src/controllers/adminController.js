const User = require("../model/UserModel");

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

const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: "paid" });

    const revenue = orders.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);

    res.status(200).json({
      success: true,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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



module.exports = {
    getTotalOrders,
    getTotalRevenue,
    getTotalUsers
}