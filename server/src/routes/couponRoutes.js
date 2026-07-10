const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupons,
  deleteCoupon,
  toggleCoupon,
  applyCoupon,
} = require("../controllers/couponController");

const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/authMiddleware");

router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  createCoupon
);

router.get(
  "/",
  isAuthenticated,
  isAdmin,
  getCoupons
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteCoupon
);

router.put(
  "/toggle/:id",
  isAuthenticated,
  isAdmin,
  toggleCoupon
);

router.post(
  "/apply",
  isAuthenticated,
  applyCoupon
);

module.exports = router;