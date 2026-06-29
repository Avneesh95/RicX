import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/Otp";
import Home from "./pages/Home";

// Admin
import AdminRoutes from "./admin/adminRoutes";
import AdminProtectedRoute from "./admin/AdminProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================
            USER ROUTES
        ====================== */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

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

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;