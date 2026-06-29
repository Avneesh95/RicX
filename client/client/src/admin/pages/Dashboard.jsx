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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productRes = await api.get("/products");

        const products =
          productRes.data.product || productRes.data || [];

        setStats({
          products: products.length,
          users: 58, // 🔥 placeholder (until backend users API)
          orders: 245, // 🔥 placeholder
          revenue: 142000, // 🔥 placeholder
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
      title: "Users",
      icon: <Users size={30} />,
      link: "/admin/users",
      color: "bg-purple-600",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={30} />,
      link: "/admin/analytics",
      color: "bg-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl text-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-blue-100">
          Manage your products, users, orders and analytics from one place.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {actions.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`${item.color} w-16 h-16 rounded-xl text-white flex items-center justify-center mb-5`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-5">
            Recent Orders
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>#ORD001</span>
              <span className="text-green-600">Delivered</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>#ORD002</span>
              <span className="text-yellow-500">Processing</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>#ORD003</span>
              <span className="text-red-500">Cancelled</span>
            </div>
          </div>
        </div>

        {/* Latest Users */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-5">
            Latest Users
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>Rahul Sharma</span>
              <span className="text-gray-500">Today</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Priya Singh</span>
              <span className="text-gray-500">Yesterday</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Amit Kumar</span>
              <span className="text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;