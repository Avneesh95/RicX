import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ShoppingCart,
  LogOut,
  User,
  Package,
  LayoutDashboard,
  Sparkles,
  Moon,
  Sun,
  Heart,
  ShieldCheck,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { getWishlist } from "../../api/wishlistApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [wishlistCount, setWishlistCount] = useState(0);

  // 1. Safely retrieve localStorage data
  const token = localStorage.getItem("token");
  
  const user = (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  })();

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superAdmin";

  // 2. Fetch wishlist count safely with cleanup flag
  useEffect(() => {
    let isMounted = true;

    const fetchWishlist = async () => {
      if (!token) {
        setWishlistCount(0);
        return;
      }

      try {
        const res = await getWishlist();
        if (isMounted) {
          setWishlistCount(res.data.wishlist?.products?.length || 0);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 3. Centralized logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setWishlistCount(0); // Reset wishlist counter immediately
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition duration-500">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              RicX
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 tracking-widest">
              PREMIUM STORE
            </p>
          </div>
        </Link>

        {/* Center Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            to="/"
            className="relative font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {token && (
            <>
              <Link
                to="/wishlist"
                className="relative flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-500 transition group"
              >
                <Heart size={20} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition group"
              >
                <ShoppingCart size={20} />
                Cart
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/orders"
                className="relative flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition group"
              >
                <Package size={20} />
                Orders
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {isSuperAdmin && (
                <Link
                  to="/admin/super-admin"
                  className="relative flex items-center gap-2 text-red-600 dark:text-red-400 font-bold hover:text-red-700 transition group"
                >
                  <ShieldCheck size={20} />
                  Super Admin
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 hover:rotate-180 transition-all duration-500 flex items-center justify-center shadow-md"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-gray-700" size={20} />
            )}
          </button>

          {token ? (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 px-3 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
              >
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}

                <div className="hidden md:flex flex-col">
                  <span className="font-semibold text-sm">{user?.name || "User"}</span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${
                      isSuperAdmin
                        ? "text-red-500"
                        : isAdmin
                          ? "text-indigo-500"
                          : "text-gray-500"
                    }`}
                  >
                    {isSuperAdmin
                      ? "👑 Super Admin"
                      : isAdmin
                        ? "🛡️ Admin"
                        : "Customer"}
                  </span>
                </div>
              </Link>

              {/* Admin Dashboard Quick Action */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <LayoutDashboard size={18} />
                  Admin
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:scale-105"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-semibold text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
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