const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder, // NEW
} = require("../controllers/orderController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

// ================= USER =================

// Place Order
router.post("/place", isAuthenticated, placeOrder);

// My Orders
router.get("/my", isAuthenticated, getMyOrders);

// Order Details
router.get("/:id", isAuthenticated, getOrderById);

// Cancel Order
router.put(
  "/cancel/:id",
  isAuthenticated,
  cancelOrder
);

// ================= ADMIN =================

// All Orders
router.get(
  "/",
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Update Status
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

// Delete Order
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteOrder
);

module.exports = router;