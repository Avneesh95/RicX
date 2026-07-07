import { Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Home,
  Upload,
} from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-slate-900 text-white shadow-lg">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

          <h1 className="text-3xl font-bold">
            RicX Admin Dashboard
          </h1>

          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            <Home size={18} />
            Home
          </Link>

        </div>

      </div>

      {/* Dashboard */}

      <div className="max-w-7xl mx-auto py-12 px-6">

        <h2 className="text-3xl font-bold mb-10">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {/* Products */}

          <Link
            to="/admin/products"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-blue-300 hover:-translate-y-2 transition duration-300 flex flex-col items-center"
          >

            <Package
              size={50}
              className="text-blue-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Products
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              Add, Edit & Delete Products
            </p>

          </Link>

          {/* Users */}

          <Link
            to="/admin/users"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-green-300 hover:-translate-y-2 transition duration-300 flex flex-col items-center"
          >

            <Users
              size={50}
              className="text-green-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Users
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              Manage Users & Admin Access
            </p>

          </Link>

          {/* Orders */}

          <Link
            to="/admin/orders"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-orange-300 hover:-translate-y-2 transition duration-300 flex flex-col items-center"
          >

            <ShoppingBag
              size={50}
              className="text-orange-500 mb-5"
            />

            <h3 className="text-xl font-bold">
              Orders
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              View & Manage Customer Orders
            </p>

          </Link>

          {/* Bulk Upload */}

          <Link
            to="/admin/bulk-upload"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-purple-300 hover:-translate-y-2 transition duration-300 flex flex-col items-center"
          >

            <Upload
              size={50}
              className="text-purple-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Bulk Upload
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              Upload Products using Excel
            </p>

          </Link>

          {/* Analytics */}

          <Link
            to="/admin/analytics"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-pink-300 hover:-translate-y-2 transition duration-300 flex flex-col items-center"
          >

            <BarChart3
              size={50}
              className="text-pink-600 mb-5"
            />

            <h3 className="text-xl font-bold">
              Analytics
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              Sales, Revenue & Reports
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default Admin;