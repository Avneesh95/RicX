const express = require("express");
const router = express.Router();

const {
  getTotalRevenue,
  getTotalOrders,
  getTotalUsers,
  makeAdmin,
  getDashboardStats,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

// ==============================
// DASHBOARD
// ==============================
router.get(
  "/dashboard",
  isAuthenticated,
  isAdmin,
  getDashboardStats
);

// ==============================
// STATISTICS
// ==============================
router.get(
  "/revenue",
  isAuthenticated,
  isAdmin,
  getTotalRevenue
);

router.get(
  "/orders",
  isAuthenticated,
  isAdmin,
  getTotalOrders
);

router.get(
  "/users/count",
  isAuthenticated,
  isAdmin,
  getTotalUsers
);

// ==============================
// USER MANAGEMENT
// ==============================
router.get(
  "/users",
  isAuthenticated,
  isAdmin,
  getAllUsers
);

router.put(
  "/users/:id/role",
  isAuthenticated,
  isAdmin,
  makeAdmin
);

router.delete(
  "/users/:id",
  isAuthenticated,
  isAdmin,
  deleteUser
);

module.exports = router;