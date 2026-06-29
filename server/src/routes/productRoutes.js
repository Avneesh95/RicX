const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");


const { createProduct ,products , getProductById , updateProduct, deleteProduct} = require("../controllers/productController");
const { isAuthenticated , isAdmin } = require("../middleware/authMiddleware");


router.post("/add",upload.single("image"),isAuthenticated,isAdmin, createProduct);

router.get('/',products);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;