import Analytics from "../pages/Analytics";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./AdminLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProducts";

import AdminUsers from "../pages/AdminUser";
import AdminOrders from "../pages/AdminOrder";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>

        {/* Dashboard */}

        <Route index element={<Dashboard />} />

        {/* Product Management */}

        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />


        {/* Order Management */}

        <Route path="orders" element={<AdminOrders />} />


        {/* Analytics */}

        <Route path="analytics" element={<Analytics />} />


        {/* User Management */}

        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
