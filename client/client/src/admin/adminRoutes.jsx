import { Routes, Route } from "react-router-dom";

import Analytics from "../pages/Analytics";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

import Coupons from "./pages/AdminCoupon";

import AdminLayout from "./AdminLayout";
import AdminManagement from "../../src/admin/Admin-management";
// Admin Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProducts";

import AdminUsers from "../pages/AdminUser";
import AdminOrders from "../pages/AdminOrder";
import AdminBulkUpload from "../pages/AdminBulkUpload";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />

        {/* Orders */}
        <Route path="orders" element={<AdminOrders />} />

        {/* Bulk Upload / Coupons (Replace later if needed) */}
        <Route path="bulk-upload" element={<AdminBulkUpload />} />

        {/* {Coupons} */}
        <Route path="coupons" element={<Coupons />} />
        {/* Analytics */}
        <Route path="analytics" element={<Analytics />} />

        <Route path="admin-management" element={<AdminManagement />} />
        {/* Users */}
        <Route path="users" element={<AdminUsers />} />

        {/* Super Admin Dashboard */}
        <Route path="super-admin" element={<SuperAdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
