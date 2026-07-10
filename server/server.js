const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// =========================
// DATABASE
// =========================
const connectDB = require("./src/config/db.js");
connectDB();

// =========================
// MIDDLEWARE (ORDER MATTERS)
// =========================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// ROUTES
// =========================
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));
app.use("/api/order", require("./src/routes/orderRoutes"));
app.use("/api/payment", require("./src/routes/paymentRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));
app.use("/api/invoice", require("./src/routes/invoiceRoutes"));

app.use("/api/wishlist", require("./src/routes/wishlistRoutes"));
app.use("/api/reviews", require("./src/routes/reviewRoutes"));

// app.use("/api/coupons", require("./src/routes/couponRoutes"));

app.use("/api/super-admin", require("./src/routes/superAdminRoutes"));

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RicX API running successfully 🚀",
  });
});

// =========================
// GLOBAL ERROR HANDLER (SAFE)
// =========================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});