const express = require("express");
const router = express.Router();

const {
  getTotalRevenue,
  getTotalOrders,
  getTotalUsers,
  makeAdmin,
  getDashboardStats, // ✅ ADD THIS
} = require("../controllers/adminController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// ==============================
// EXISTING APIs
// ==============================
router.get("/revenue", isAuthenticated, isAdmin, getTotalRevenue);

router.get("/orders", isAuthenticated, isAdmin, getTotalOrders);

router.get("/users", isAuthenticated, isAdmin, getTotalUsers);

router.put(
  "/users/:id/role",
  isAuthenticated,
  isAdmin,
  makeAdmin
);

// ==============================
// 🚀 NEW CLEAN DASHBOARD API
// ==============================
router.get(
  "/dashboard",
  isAuthenticated,
  isAdmin,
  getDashboardStats
);

module.exports = router;