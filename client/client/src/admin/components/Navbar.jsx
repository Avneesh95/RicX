import { Link } from "react-router-dom";
import { ShoppingCart, User, Shield, LogOut } from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600 tracking-wide"
        >
          RicX
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <a
            href="#categories"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Categories
          </a>

          <a
            href="#products"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Products
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button className="relative">
            <ShoppingCart
              size={24}
              className="text-gray-700 hover:text-blue-600"
            />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Show Admin Button ONLY for Admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition"
            >
              <Shield size={18} />
              Admin Dashboard
            </Link>
          )}

          {/* Login / Logout */}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <User size={18} />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;