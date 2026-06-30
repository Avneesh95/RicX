import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-6 mb-6"
          >
            <h2 className="font-bold">
              Order #{order._id.slice(-6)}
            </h2>

            <p className="mt-2">
              Status:
              <span className="text-indigo-600 ml-2">
                {order.status}
              </span>
            </p>

            <p>
              Payment:
              <span className="text-green-600 ml-2">
                {order.paymentStatus}
              </span>
            </p>

            <p className="font-bold mt-3">
              ₹{order.totalAmount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}