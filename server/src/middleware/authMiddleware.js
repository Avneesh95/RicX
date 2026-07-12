const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

// ==============================
// Basic JWT Authentication
// ==============================

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ==============================
// Alias
// ==============================

const isAuthenticated = authMiddleware;

// ==============================
// Admin Middleware
// ==============================

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  if (
    req.user.role !== "admin" &&
    req.user.role !== "superAdmin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

// ==============================
// Super Admin Middleware
// ==============================

const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  if (req.user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Super Admin access required",
    });
  }

  next();
};


/* =====================================================
   SET HERO COUPON
===================================================== */

exports.setHeroCoupon = async (req, res) => {
  try {
    await Coupon.updateMany(
      {},
      {
        showOnHero: false,
      }
    );

    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.showOnHero = true;

    await coupon.save();

    res.json({
      success: true,
      message: "Hero coupon updated successfully",
      coupon,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/* =====================================================
   GET HERO COUPON
===================================================== */

exports.getHeroCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      showOnHero: true,
      isActive: true,
    });

    res.json({
      success: true,
      coupon,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ==============================
// Exports
// ==============================

module.exports = {
  authMiddleware,
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
};