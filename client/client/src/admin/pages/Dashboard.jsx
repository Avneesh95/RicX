import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get("/api/admin/users/count");
      const orders = await axios.get("/api/admin/orders/count");
      const revenue = await axios.get("/api/admin/revenue");

      setData({
        users: users.data.totalUsers,
        orders: orders.data.totalOrders,
        revenue: revenue.data.revenue,
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Users" value={data.users} />
        <StatCard title="Orders" value={data.orders} />
        <StatCard title="Revenue" value={`₹${data.revenue}`} />
      </div>
    </div>
  );
};

export default Dashboard;