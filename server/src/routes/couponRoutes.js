const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupons,
  deleteCoupon,
  toggleCoupon,
  applyCoupon,
  setHeroCoupon,
  getHeroCoupon,
} = require("../controllers/couponController");


const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
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

/* ===========================
   HERO COUPON
=========================== */

// Public route (Home Page)
router.get("/hero", getHeroCoupon);

// Only Super Admin can change Hero Coupon
router.put(
  "/hero/:id",
  isAuthenticated,
  isAdmin,
  setHeroCoupon
);

router.put(
  "/hero/:id",
  isAuthenticated,
  isSuperAdmin,
  setHeroCoupon
);

router.get("/hero", getHeroCoupon);

module.exports = router;