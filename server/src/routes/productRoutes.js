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

// Public
router.get("/", products);
router.get("/:id", getProductById);

// Admin
router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteProduct
);

module.exports = router;