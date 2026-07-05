import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OrderTimeline from "../components/Ordertimeline";
import {
  Package,
  MapPin,
  CreditCard,
  ArrowLeft,
  XCircle,
} from "lucide-react";

import {
  getOrderById,
  cancelOrder,
} from "../api/orderApi";
    
    
    const OrderDetails = () => {
        const { id } = useParams();
      console.log("Order ID:", id);
      console.log("✅ OrderDetails component loaded");
      
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchOrder = async () => {
  try {
    const res = await getOrderById(id);

    console.log("Full response:", res.data);
    console.log("Order items:", res.data.order.orderItems);

    setOrder(res.data.order);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    const ok = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!ok) return;

    try {
      await cancelOrder(order._id);

      alert("Order cancelled successfully");

      fetchOrder();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to cancel order"
      );
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* Back */}

      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-indigo-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      {/* Order Summary */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <div className="flex flex-wrap justify-between gap-6">

          <div>

            <h2 className="font-semibold text-lg">
              Order ID
            </h2>

            <p className="text-gray-500 break-all">
              {order._id}
            </p>

          </div>

          <div>

            <h2 className="font-semibold text-lg">
              Status
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-white ${
                order.status === "delivered"
                  ? "bg-green-600"
                  : order.status === "cancelled"
                  ? "bg-red-600"
                  : order.status === "shipped"
                  ? "bg-blue-600"
                  : "bg-yellow-500"
              }`}
            >
              {order.status}
            </span>

          </div>

          <div>

            <h2 className="font-semibold text-lg">
              Payment
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-white ${
                order.paymentStatus === "paid"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {order.paymentStatus}
            </span>

          </div>

          <div>

            <h2 className="font-semibold text-lg">
              Total
            </h2>

            <p className="text-2xl font-bold text-green-600">
              ₹{order.totalAmount}
            </p>

          </div>

        </div>

      </div>

      {/* Shipping */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <div className="flex items-center gap-3 mb-5">

          <MapPin className="text-indigo-600" />

          <h2 className="text-2xl font-bold">
            Shipping Address
          </h2>

        </div>

        <p>
          <strong>Name:</strong>{" "}
          {order.shippingAddress.fullName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {order.shippingAddress.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order.shippingAddress.address}
        </p>

        <p>
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state}
        </p>

        <p>
          {order.shippingAddress.country} -
          {" "}
          {order.shippingAddress.pincode}
        </p>

      </div>

      {/* Products */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <div className="flex items-center gap-3 mb-6">

          <Package className="text-indigo-600" />

          <h2 className="text-2xl font-bold">
            Ordered Products
          </h2>

        </div>

        <div className="space-y-5">

          {order.orderItems.map((item) => (

            <div
              key={item._id}
              className="border rounded-xl p-4 flex gap-5 items-center"
            >

              <img
                src={item.product?.image?.url}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">

                <h3 className="font-bold text-lg">
                  {item.product?.name}
                </h3>

                <p className="text-gray-600">
                  Quantity : {item.quantity}
                </p>
                
                <p className="font-semibold text-green-600">
                  ₹{item.price}
                </p>

//timeline
                <OrderTimeline status={order.status} />
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Payment */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <div className="flex items-center gap-3 mb-4">

          <CreditCard className="text-indigo-600" />

          <h2 className="text-2xl font-bold">
            Payment Information
          </h2>

        </div>

        <p>
          <strong>Status :</strong>{" "}
          {order.paymentStatus}
        </p>

        <p>
          <strong>Total :</strong> ₹
          {order.totalAmount}
        </p>

      </div>

      {/* Actions */}

      <div className="flex gap-4">

        {order.status !== "cancelled" &&
          order.status !== "shipped" &&
          order.status !== "delivered" && (

            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
            >
              <XCircle size={20} />
              Cancel Order
            </button>

          )}

      </div>

    </div>
  );
};

export default OrderDetails;