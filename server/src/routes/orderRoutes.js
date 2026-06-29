const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");


router.post("/place", isAuthenticated, placeOrder);

router.get("/my", isAuthenticated, getMyOrders);


router.get("/:id", isAuthenticated, getOrderById);


router.get("/", isAuthenticated, getAllOrders);

router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;