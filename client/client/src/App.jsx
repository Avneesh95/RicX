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

// Theme
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* ======================
              USER ROUTES
          ====================== */}

          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Product */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* Orders */}
          <Route path="/orders" element={<Orders />} />

          <Route
            path="/order/:id"
            element={<OrderDetails />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Success */}
          <Route
            path="/success"
            element={<OrderSuccess />}
          />

          {/* Authentication */}
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/otp"
            element={<OTP />}
          />

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
              <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300">
                <div className="text-center">
                  <h1 className="text-7xl font-bold text-red-500">
                    404
                  </h1>

                  <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
                    Page Not Found
                  </p>
                </div>
              </div>
            }
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;