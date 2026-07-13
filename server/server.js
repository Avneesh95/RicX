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
// 👑 Updated setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://ricx.netlify.app" // Your live Netlify domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

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

app.use("/api/coupon", require("./src/routes/couponRoutes"));

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