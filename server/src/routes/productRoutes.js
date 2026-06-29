const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProduct,
  products,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

// ======================
// Public Routes
// ======================

// Get all products
router.get("/", products);

// Get single product
router.get("/:id", getProductById);

// ======================
// Admin Routes
// ======================

// Create product
router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createProduct
);

// Update product
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteProduct
);

module.exports = router;