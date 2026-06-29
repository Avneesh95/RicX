import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  Home,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

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
      show: role === "admin",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
      show: role === "admin",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/admin/add-product",
      show: role === "admin",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
      show: role === "admin",
    },
    {
      name: "Home",
      icon: <Home size={20} />,
      path: "/",
      show: true,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen shadow-lg relative">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">
          RicX
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-16 left-0 w-64 px-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-64 px-6">
        <p className="text-gray-500 text-sm text-center">
          © 2026 RicX Store
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;