const express = require("express");
const router = express.Router();

const {
  getTotalRevenue,
  getTotalOrders,
  getTotalUsers,
  makeAdmin
} = require("../controllers/adminController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.get("/revenue", isAuthenticated, isAdmin, getTotalRevenue);

router.get("/orders", isAuthenticated, isAdmin, getTotalOrders);

router.get("/users", isAuthenticated, isAdmin, getTotalUsers);

router.put(
    "/users/:id/role",
    isAuthenticated,
    isAdmin,
    makeAdmin
);

module.exports = router;