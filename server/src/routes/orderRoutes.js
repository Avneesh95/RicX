const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

// ================= USER =================
router.post("/place", isAuthenticated, placeOrder);

router.get("/my", isAuthenticated, getMyOrders);

router.get("/:id", isAuthenticated, getOrderById);

// ================= ADMIN =================


router.get("/", isAuthenticated, isAdmin, getAllOrders);

router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);

router.delete("/:id", isAuthenticated, isAdmin, deleteOrder);

module.exports = router;