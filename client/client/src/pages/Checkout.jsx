import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import api from "../api/axios";

import {
  createPaymentOrder,
  verifyPayment,
} from "../api/paymentApi";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Buy Now Data
  const buyNow = location.state?.buyNow || false;
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login");
        navigate("/login");
        return;
      }

      // Decide endpoint
      const endpoint = buyNow
        ? "/order/buy-now"
        : "/order/place";

      // Payload
      const payload = buyNow
        ? {
            ...form,
            productId: product._id,
            quantity,
          }
        : form;

      // Create Order
      const { data } = await api.post(
        endpoint,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = data.order;

      if (!order) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      // Create Razorpay Order
      const paymentData =
        await createPaymentOrder(order._id);

      const razorpayOrder =
        paymentData.order;

      const razorpayKey =
        paymentData.key;

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKey,

        amount: razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name: "RicX Store",

        description: buyNow
          ? "Buy Now"
          : "Cart Checkout",

        image: "/logo.png",

        order_id: razorpayOrder.id,

        prefill: {
          name: form.fullName,
          contact: form.phone,
        },

        theme: {
          color: "#4F46E5",
        },

        handler: async (
          response
        ) => {
          try {
            await verifyPayment({
              orderId: order._id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_signature:
                response.razorpay_signature,
            });

            alert(
              "Payment Successful"
            );

            navigate("/orders");
          } catch (err) {
            console.error(err);

            alert(
              "Payment Verification Failed"
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);

            alert(
              "Payment Cancelled"
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Order Failed"
      );

      setLoading(false);
    }
  };
    return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <h1 className="text-3xl font-bold mb-2">
        Checkout
      </h1>

      {buyNow && product && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">

          <h2 className="font-bold text-lg mb-4">
            Buying Now
          </h2>

          <div className="flex items-center gap-4">

            <img
              src={product.image?.url}
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover border"
            />

            <div className="flex-1">

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-600">
                Quantity : {quantity}
              </p>

              <p className="text-green-600 font-bold text-xl mt-1">
                ₹{product.price}
              </p>

            </div>

          </div>

        </div>
      )}

      <form
        onSubmit={placeOrder}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border rounded-lg p-3"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          rows="4"
          required
          className="w-full border rounded-lg p-3"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="border rounded-lg p-3"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="border rounded-lg p-3"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="border rounded-lg p-3"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
        >
          {loading
            ? "Please Wait..."
            : "Pay with Razorpay"}
        </button>

      </form>

    </div>
  );
}