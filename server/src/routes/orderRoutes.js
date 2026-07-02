const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} = require("../controllers/orderController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

// ======================
// USER ROUTES
// ======================

// Place Order
router.post("/place", isAuthenticated, placeOrder);

// Get My Orders
router.get("/my", isAuthenticated, getMyOrders);

// Cancel Order
router.put("/cancel/:id", isAuthenticated, cancelOrder);

// Get Single Order Details
router.get("/:id", isAuthenticated, getOrderById);

// ======================
// ADMIN ROUTES
// ======================

// Get All Orders
router.get("/", isAuthenticated, isAdmin, getAllOrders);

// Update Order Status
router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);

// Delete Order
router.delete("/:id", isAuthenticated, isAdmin, deleteOrder);

module.exports = router;