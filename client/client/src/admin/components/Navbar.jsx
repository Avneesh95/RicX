import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShoppingCart,
  User,
  Shield,
  LogOut,
  Heart,
  Search,
  Menu,
  X,
  Package,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(search);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          RicX
        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-8">

          <Link
            to="/"
            className="font-semibold hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <a
            href="#categories"
            className="font-semibold hover:text-indigo-600 transition"
          >
            Categories
          </a>

          <a
            href="#products"
            className="font-semibold hover:text-indigo-600 transition"
          >
            Products
          </a>

          <Link
            to="/orders"
            className="font-semibold hover:text-indigo-600 transition"
          >
            Orders
          </Link>

        </div>

        {/* Search */}

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearch}
            className="bg-transparent outline-none px-3 w-full"
          />

        </div>

                {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Wishlist */}

          <button className="hidden md:flex w-11 h-11 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition items-center justify-center shadow">

            <Heart size={20} />

          </button>

          {/* Orders */}

          <Link
            to="/orders"
            className="hidden md:flex w-11 h-11 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white transition items-center justify-center shadow"
          >

            <Package size={20} />

          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative flex w-11 h-11 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white transition items-center justify-center shadow"
          >

            <ShoppingCart size={20} />

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>

          </Link>

          {/* Admin */}

          {user?.role === "admin" && (

            <Link
              to="/admin"
              className="hidden lg:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl transition"
            >

              <Shield size={18} />

              Admin

            </Link>

          )}

          {/* Login / Logout */}

          {!user ? (

            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition shadow"
            >

              <User size={18} />

              Login

            </Link>

          ) : (

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition shadow"
            >

              <LogOut size={18} />

              Logout

            </button>

          )}

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden"
          >

            {mobileMenu ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}

          </button>

        </div>

      </div>

            {/* Mobile Menu */}

      {mobileMenu && (
        <div className="lg:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col px-6 py-5 space-y-4">

            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="font-semibold hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <a
              href="#categories"
              onClick={() => setMobileMenu(false)}
              className="font-semibold hover:text-indigo-600 transition"
            >
              Categories
            </a>

            <a
              href="#products"
              onClick={() => setMobileMenu(false)}
              className="font-semibold hover:text-indigo-600 transition"
            >
              Products
            </a>

            <Link
              to="/orders"
              onClick={() => setMobileMenu(false)}
              className="font-semibold hover:text-indigo-600 transition"
            >
              My Orders
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenu(false)}
              className="font-semibold hover:text-indigo-600 transition"
            >
              Cart
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMobileMenu(false)}
                className="bg-slate-900 text-white text-center py-3 rounded-xl hover:bg-slate-800 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="bg-indigo-600 text-white text-center py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;