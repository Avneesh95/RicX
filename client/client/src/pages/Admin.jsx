import { Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Home,
} from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-slate-900 text-white shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

          <h1 className="text-3xl font-bold">
            RicX Admin Dashboard
          </h1>

          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            <Home size={18} />
            Home
          </Link>

        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="max-w-7xl mx-auto py-12 px-6">

        <h2 className="text-2xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Products */}

          <Link
            to="/admin/products"
            className="bg-white rounded-2xl shadow hover:shadow-xl p-8 transition"
          >
            <Package
              size={45}
              className="text-blue-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Products
            </h3>

            <p className="text-gray-500 mt-2">
              Add, Edit & Delete Products
            </p>

          </Link>

          {/* Users */}

          <Link
            to="/admin/users"
            className="bg-white rounded-2xl shadow hover:shadow-xl p-8 transition"
          >
            <Users
              size={45}
              className="text-green-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Users
            </h3>

            <p className="text-gray-500 mt-2">
              Manage Users & Make Admin
            </p>

          </Link>

          {/* Orders */}

          <Link
            to="/admin/orders"
            className="bg-white rounded-2xl shadow hover:shadow-xl p-8 transition"
          >
            <ShoppingBag
              size={45}
              className="text-orange-500 mb-5"
            />

            <h3 className="text-xl font-bold">
              Orders
            </h3>

            <p className="text-gray-500 mt-2">
              View Customer Orders
            </p>

          </Link>

          {/* Analytics */}

          <Link
            to="/admin/analytics"
            className="bg-white rounded-2xl shadow hover:shadow-xl p-8 transition"
          >
            <BarChart3
              size={45}
              className="text-purple-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Analytics
            </h3>

            <p className="text-gray-500 mt-2">
              Sales & Revenue Reports
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default Admin;