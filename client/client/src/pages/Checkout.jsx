import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";

export default function Checkout() {
  const navigate = useNavigate();

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
    if (loading) return; // Prevent multiple accidental form submissions

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      console.log("🔐 TOKEN:", token);
      console.log("📦 FORM DATA:", form);

      if (!token) {
        alert("Login required");
        navigate("/login");
        return;
      }

      // ===================================
      // STEP 1: CREATE INTERNAL APP ORDER
      // ===================================
      const { data } = await api.post(
        "/order/place",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📦 ORDER RESPONSE:", data);
      const order = data.order;

      if (!order) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      // ===================================
      // STEP 2: CREATE RAZORPAY INTENT ORDER
      // ===================================
      // FIXED: paymentData is already res.data from paymentApi.js
      const paymentData = await createPaymentOrder(order._id);
      console.log("💳 PAYMENT API RESPONSE PAYLOAD:", paymentData);

      const razorpayOrder = paymentData?.order;
      const razorpayKey = paymentData?.key;

      if (!razorpayOrder) {
        alert("Payment order creation failed");
        setLoading(false);
        return;
      }

      // Ensure the Razorpay script is present on window
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please check your network connection.");
        setLoading(false);
        return;
      }

      // ===================================
      // STEP 3: CONFIGURE & OPEN RAZORPAY
      // ===================================
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "RicX Store",
        description: "Product Purchase",
        image: "/logo.png",
        order_id: razorpayOrder.id,

        prefill: {
          name: form.fullName,
          contact: form.phone,
        },

        theme: {
          color: "#4F46E5",
        },

        handler: async function (response) {
          try {
            setLoading(true); // Re-trigger loading display while validating cryptographically
            console.log("💰 RAZORPAY POPUP GATEWAY RESPONSE:", response);

            await verifyPayment({
              orderId: order._id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("🎉 Payment Successful");
            navigate("/orders");
          } catch (err) {
            console.error("❌ VERIFY ERROR:", err.response?.data || err.message);
            alert("Payment Verification Failed");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false); // Reset loading hook if payment portal is closed out manually
            alert("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("❌ ORDER FLOW FAILURE:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message ||
        "Order Failed"
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form
        onSubmit={placeOrder}
        className="space-y-5 bg-white shadow rounded-xl p-6"
      >
        <input
          name="fullName"
          value={form.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        {/* Organized address metrics fields inside a clean responsive flexbox layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="state"
            value={form.state}
            placeholder="State"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="pincode"
            value={form.pincode}
            placeholder="Pincode"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 font-semibold transition"
        >
          {loading ? "Please Wait..." : "Pay with Razorpay"}
        </button>
      </form>
    </div>
  );
}