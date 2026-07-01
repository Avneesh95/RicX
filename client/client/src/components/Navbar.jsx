import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogOut,
  User,
  Package,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-indigo-600"
        >
          RicX Store
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="font-medium hover:text-indigo-600 transition"
          >
            Home
          </Link>

          {token && (
            <>
              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                <ShoppingCart size={21} />
                Cart
              </Link>

              {/* Orders */}
              <Link
                to="/orders"
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                <Package size={20} />
                Orders
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-indigo-600 transition"
              >
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}

                <span className="font-semibold">
                  {user?.name}
                </span>
              </Link>

              {/* Admin Dashboard */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <LayoutDashboard size={18} />
                  Admin
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;