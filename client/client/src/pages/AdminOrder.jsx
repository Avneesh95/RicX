import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../api/orderApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchOrders = async () => {
    try {
      console.log("📦 Fetching orders...");

      const res = await getAllOrders();

      console.log("📦 ORDERS RESPONSE:", res.data);

      setOrders(res.data.orders || res.data || []);
    } catch (err) {
      console.error("❌ ORDER FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= STATUS UPDATE =================
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      console.log("🔄 Updating order:", id, status);

      const res = await updateOrderStatus(id, status, token);

      console.log("✅ UPDATED:", res.data);

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.response?.data || err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= DELETE ORDER =================
  const handleDelete = async (id) => {
    try {
      console.log("🗑 Deleting order:", id);

      await deleteOrder(id, token);

      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("❌ DELETE ERROR:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Orders Management
      </h1>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >

            {/* LEFT */}
            <div>
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>

              <p className="text-sm text-gray-500">
                ₹{order.totalAmount}
              </p>

              <p className="text-sm">
                Payment:{" "}
                <span className="font-medium">
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            {/* MIDDLE */}
            <div>
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                disabled={updatingId === order._id}
                className="border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* RIGHT */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}