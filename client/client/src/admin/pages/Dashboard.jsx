import { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingBag,
  IndianRupee,
  PlusCircle,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats({
        products: res.data.products || 0,
        users: res.data.users || 0,
        orders: res.data.orders || 0,
        revenue: res.data.revenue || 0,
      });

      setRecentOrders(res.data.recentOrders || []);
      setLatestUsers(res.data.latestUsers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-500">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Products",
      value: stats.products,
      icon: <Package size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <Users size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: <ShoppingBag size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <IndianRupee size={28} />,
      color: "bg-green-600",
    },
  ];

  const actions = [
    {
      title: "Manage Products",
      icon: <Package size={30} />,
      link: "/admin/products",
      color: "bg-blue-600",
    },
    {
      title: "Add Product",
      icon: <PlusCircle size={30} />,
      link: "/admin/add-product",
      color: "bg-green-600",
    },
    {
      title: "Manage Orders",
      icon: <ShoppingBag size={30} />,
      link: "/admin/orders",
      color: "bg-orange-500",
    },
    {
      title: "Manage Users",
      icon: <Users size={30} />,
      link: "/admin/users",
      color: "bg-purple-600",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={30} />,
      link: "/admin/analytics", // ✅ CORRECT
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

        <p className="mt-3 text-blue-100 text-lg">
          Manage your products, users, orders and monitor your store performance
          from one powerful dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>

          <span className="text-gray-500">Everything at one place</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {actions.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6"
            >
              <div
                className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>

              <p className="text-gray-500 mt-2 text-sm">Click to manage</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8"></div>
      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Recent Orders</h2>

            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold">#{order._id.slice(-6)}</p>

                    <p className="text-sm text-gray-500">
                      {order.shippingAddress?.fullName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ₹{order.totalAmount}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No recent orders found.
            </div>
          )}
        </div>

        {/* Latest Users */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Latest Users</h2>

            <Link
              to="/admin/users"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>

          {latestUsers.length > 0 ? (
            <div className="space-y-4">
              {latestUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
