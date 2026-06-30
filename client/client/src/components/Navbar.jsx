import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut } from "lucide-react";

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
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          RicX Store
        </Link>

        {/* Menu */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-indigo-600"
          >
            Home
          </Link>

          {token && (
            <Link
              to="/cart"
              className="relative flex items-center gap-2 hover:text-indigo-600"
            >
              <ShoppingCart size={22} />
              Cart
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Admin Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">
                Hi, {user?.name}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;