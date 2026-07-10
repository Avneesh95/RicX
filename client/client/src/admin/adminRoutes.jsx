import { Routes, Route } from "react-router-dom";

import Analytics from "../pages/Analytics";

import AdminLayout from "./AdminLayout";

// Pages
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

        {/* Bulk Upload */}
        <Route path="bulk-upload" element={<AdminBulkUpload />} />

        {/* Analytics */}
        <Route path="analytics" element={<Analytics />} />

        {/* Users */}
        <Route path="users" element={<AdminUsers />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;