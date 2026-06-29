const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes.js");
const productRoutes = require("./src/routes/productRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes.js");
const adminRoutes = require("./src/routes/adminRoutes");

const invoiceRoutes = require("./src/routes/invoiceRoutes");
const cartRoutes = require("./src/routes/cartRoutes");

const port = 4000;

app.use(cors({
  origin: "http://localhost:5173", // Vite default
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/order", orderRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/invoice", invoiceRoutes);


app.get("/",(req,res)=>{
  res.send("working");
})

connectDB();

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
