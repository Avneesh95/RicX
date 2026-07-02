import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  XCircle,
  Eye,
  Download,
} from "lucide-react";

import {
  getMyOrders,
  cancelOrder,
  downloadInvoice,
} from "../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!ok) return;

    try {
      await cancelOrder(id);

      alert("Order cancelled successfully");

      fetchOrders();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to cancel order"
      );
    }
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const res = await downloadInvoice(id);

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = `RicX-Invoice-${id}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download invoice");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-24">

          <Package
            size={70}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-2xl mt-4">
            No Orders Yet
          </h2>

          <Link
            to="/"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </Link>

        </div>
      ) : (
        <div className="space-y-6">{orders.map((order) => (
  <div
    key={order._id}
    className="bg-white shadow-lg rounded-2xl p-6 border"
  >
    {/* Header */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <div>
        <p className="text-sm text-gray-500">
          Order ID
        </p>

        <p className="font-semibold break-all">
          {order._id}
        </p>

        <p className="mt-2 text-gray-600">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-500">
          Total Amount
        </p>

        <p className="text-2xl font-bold text-green-600">
          ₹{order.totalAmount}
        </p>
      </div>

      <div className="text-right">

        <span
          className={`inline-block px-4 py-2 rounded-full text-white ${
            order.status === "delivered"
              ? "bg-green-600"
              : order.status === "cancelled"
              ? "bg-red-600"
              : order.status === "shipped"
              ? "bg-blue-600"
              : order.status === "confirmed"
              ? "bg-indigo-600"
              : "bg-yellow-500"
          }`}
        >
          {order.status.toUpperCase()}
        </span>

        <p className="mt-3 text-sm">
          Payment :
          <span
            className={`ml-2 font-semibold ${
              order.paymentStatus === "paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.paymentStatus}
          </span>
        </p>

      </div>

    </div>

    {/* Products */}

    <div className="mt-8">

      <h3 className="font-bold text-xl mb-4">
        Products ({order.orderItems.length})
      </h3>

      <div className="space-y-4">

        {order.orderItems.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-5 border rounded-xl p-4 hover:shadow-md transition"
          >

            <img
              src={item.product?.image?.url}
              alt={item.product?.name}
              className="w-24 h-24 rounded-xl object-cover border"
            />

            <div className="flex-1">

              <h3 className="text-lg font-bold">
                {item.product?.name}
              </h3>

              <p className="text-gray-500 mt-1">
                Quantity : {item.quantity}
              </p>

              <p className="font-bold text-green-600 mt-1">
                ₹{item.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

    {/* Action Buttons */}
    <div className="mt-6 flex flex-wrap gap-3">              <Link
                to={`/order/${order._id}`}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
              >
                <Eye size={18} />
                View Details
              </Link>

              <button
                onClick={() =>
                  handleDownloadInvoice(order._id)
                }
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
              >
                <Download size={18} />
                Download Invoice
              </button>

              {order.paymentStatus === "paid" &&
                order.status !== "cancelled" &&
                order.status !== "shipped" &&
                order.status !== "delivered" && (
                  <button
                    onClick={() =>
                      handleCancel(order._id)
                    }
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    <XCircle size={18} />
                    Cancel Order
                  </button>
              )}

            </div>

          </div>
        ))}

        </div>
      )}

    </div>
  );
};

export default Orders;
