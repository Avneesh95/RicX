const express = require("express");
const router = express.Router();

const {
  getTotalRevenue,
  getTotalOrders,
  getTotalUsers,
} = require("../controllers/adminController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.get("/revenue", isAuthenticated, isAdmin, getTotalRevenue);

router.get("/orders", isAuthenticated, isAdmin, getTotalOrders);

router.get("/users", isAuthenticated, isAdmin, getTotalUsers);

module.exports = router;