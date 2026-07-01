import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  Home,
  LogOut,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/admin/analytics",
      show: role === "admin",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/admin/add-product",
    },
    {
      name: "Manage Orders",
      icon: <ShoppingBag size={20} />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
      show: role === "admin",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-700">
        <h1 className="text-4xl font-extrabold text-blue-500">RicX</h1>
        <p className="text-sm text-slate-400 mt-2">Admin Dashboard</p>

        {user && (
          <div className="mt-5 bg-slate-800 rounded-xl p-3">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems
          .filter((item) => item.show !== false)
          .map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-4 space-y-3">

        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <Home size={20} />
          Back to Store
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">© 2026 RicX Store</p>
          <p className="text-[11px] text-slate-600 mt-1">Version 1.0</p>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;