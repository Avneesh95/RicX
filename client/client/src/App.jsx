import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/Otp";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";

// Admin
import AdminRoutes from "./admin/adminRoutes";
import AdminProtectedRoute from "./admin/AdminProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      {/* 💡 If you have a global Header/Navbar component, place it here right above <Routes> */}
      <Routes>
        {/* ======================
            USER ROUTES
        ====================== */}

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Product */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        {/* User Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Payment Success */}
        <Route path="/success" element={<OrderSuccess />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />

        {/* ======================
            ADMIN ROUTES
        ====================== */}

        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminRoutes />
            </AdminProtectedRoute>
          }
        />

        {/* ======================
            404 PAGE
        ====================== */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-gray-600 mt-4">Page Not Found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;