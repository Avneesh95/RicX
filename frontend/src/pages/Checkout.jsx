import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  Building2,
  Landmark,
  Hash,
  CreditCard,
  Wallet,
  ShieldCheck,
  Loader2,
  Tag,
  X,
  CheckCircle2,
} from "lucide-react";

import api from "../api/axios";
import { getCart } from "../api/cartApi";
import { applyCoupon } from "../api/couponApi";
import {
  createPaymentOrder,
  verifyPayment,
  cancelPendingOrder,
} from "../api/paymentApi";
import { toast } from "../utils/toast";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Buy Now Data
  const buyNow = location.state?.buyNow || false;
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;

  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(!buyNow);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  // ============ Coupon state ============
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount, finalAmount }
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    if (buyNow) return;

    (async () => {
      try {
        const { data } = await getCart();
        setCart(data.cart);
      } catch (err) {
        console.log(err);
      } finally {
        setCartLoading(false);
      }
    })();
  }, [buyNow]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = buyNow
    ? (product?.price || 0) * quantity
    : (cart?.items || []).reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      );

  const discount = appliedCoupon?.discount || 0;
  const orderTotal = Math.max(subtotal - discount, 0);

  // Re-validate the applied coupon if the cart total changes (e.g. cart
  // still loading when the coupon was first applied) so the discount
  // shown always matches a real, currently-valid amount.
  useEffect(() => {
    if (appliedCoupon && subtotal > 0) {
      handleApplyCoupon(appliedCoupon.code, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  const handleApplyCoupon = async (codeOverride, silent = false) => {
    const code = (codeOverride || couponInput).trim();

    if (!code) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (subtotal <= 0) {
      toast.error("Your order total isn't ready yet — try again in a moment");
      return;
    }

    try {
      setCouponLoading(true);
      const { data } = await applyCoupon({ code, amount: subtotal });

      setAppliedCoupon({
        code: data.coupon.code,
        discount: data.discount,
        finalAmount: data.finalAmount,
      });

      if (!silent) {
        toast.success(`Coupon "${data.coupon.code}" applied — you saved ₹${data.discount}!`);
      }
    } catch (err) {
      setAppliedCoupon(null);
      toast.error(err.response?.data?.message || "Invalid coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please Login");
        navigate("/login");
        return;
      }

      const endpoint = buyNow ? "/order/buy-now" : "/order/place";

      const payload = buyNow
        ? {
            ...form,
            productId: product._id,
            quantity,
            paymentMethod,
            couponCode: appliedCoupon?.code,
          }
        : { ...form, paymentMethod, couponCode: appliedCoupon?.code };

      const { data } = await api.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const order = data.order;

      if (!order) {
        toast.error("Order creation failed");
        setLoading(false);
        return;
      }

      // ============ CASH ON DELIVERY: done, no payment gateway needed ============
      if (paymentMethod === "cod") {
        navigate("/success", { state: { paymentMethod: "cod" } });
        return;
      }

      // ============ RAZORPAY ONLINE PAYMENT ============
      const paymentData = await createPaymentOrder([order._id]);
      const razorpayOrder = paymentData.order;
      const razorpayKey = paymentData.key;

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "RicX Store",
        description: buyNow ? "Buy Now" : "Cart Checkout",
        image: "/logo.png",
        order_id: razorpayOrder.id,
        prefill: {
          name: form.fullName,
          contact: form.phone,
        },
        theme: { color: "#4F46E5" },
        handler: async (response) => {
          try {
            await verifyPayment({
              orderIds: [order._id],
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            navigate("/success", { state: { paymentMethod: "razorpay" } });
          } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Payment Verification Failed");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          // If the user closes the popup without paying, release the stock
          // and remove the abandoned order instead of leaving it stuck.
          ondismiss: async () => {
            try {
              await cancelPendingOrder([order._id]);
            } catch (err) {
              console.log(err);
            } finally {
              setLoading(false);
              toast.success("Payment cancelled — your order was not placed.");
            }
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Order Failed");
      setLoading(false);
    }
  };

  const fields = [
    { name: "fullName", placeholder: "Full Name", icon: User, span: 2 },
    { name: "phone", placeholder: "Phone Number", icon: Phone, span: 2 },
    { name: "address", placeholder: "Address", icon: MapPin, span: 2, textarea: true },
    { name: "city", placeholder: "City", icon: Building2, span: 1 },
    { name: "state", placeholder: "State", icon: Landmark, span: 1 },
    { name: "pincode", placeholder: "Pincode", icon: Hash, span: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>

          {buyNow && product && (
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-gray-800 rounded-2xl p-5">
              <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Buying Now</h2>
              <div className="flex items-center gap-4">
                <img
                  src={product.image?.url}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover border dark:border-gray-800"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Quantity: {quantity}</p>
                  <p className="text-green-600 dark:text-green-400 font-bold text-xl mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={placeOrder}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 space-y-5"
          >
            <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" /> Shipping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(({ name, placeholder, icon: Icon, span, textarea }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={span === 2 ? "md:col-span-2" : ""}
                >
                  <div className="relative">
                    <Icon
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    {textarea ? (
                      <textarea
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        rows={3}
                        required
                        className="w-full border dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    ) : (
                      <input
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full border dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                <CreditCard size={20} className="text-indigo-600" /> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition text-left ${
                    paymentMethod === "razorpay"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                      : "border-gray-200 dark:border-gray-800 hover:border-indigo-300"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Pay Online</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Cards, UPI, wallets via Razorpay
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition text-left ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                      : "border-gray-200 dark:border-gray-800 hover:border-emerald-300"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Pay when your order arrives
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                paymentMethod === "cod"
                  ? "bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
              } text-white`}
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {loading
                ? "Processing..."
                : paymentMethod === "cod"
                  ? "Place Order (Pay on Delivery)"
                  : "Pay Now with Razorpay"}
            </button>

            <p className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-600">
              <ShieldCheck size={14} /> Your information is secure and encrypted
            </p>
          </form>
        </motion.div>

        {/* Right: Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 sticky top-6">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            {buyNow && product ? (
              <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-800">
                <img
                  src={product.image?.url}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Qty {quantity} × ₹{product.price}
                  </p>
                </div>
              </div>
            ) : cartLoading ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading cart...</p>
            ) : (
              <div className="space-y-3 pb-4 border-b dark:border-gray-800 max-h-64 overflow-y-auto">
                {(cart?.items || []).map((item) => (
                  <div key={item.product?._id} className="flex items-center gap-3">
                    <img
                      src={item.product?.image?.url}
                      alt={item.product?.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty {item.quantity} × ₹{item.product?.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon */}
            <div className="py-4 border-b dark:border-gray-800">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 size={18} />
                    <div>
                      <p className="font-semibold text-sm">{appliedCoupon.code} applied</p>
                      <p className="text-xs">You saved ₹{appliedCoupon.discount}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-green-700 dark:text-green-400 hover:text-red-600 transition"
                    aria-label="Remove coupon"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="w-full border dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    disabled={couponLoading}
                    className="px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {couponLoading ? <Loader2 className="animate-spin" size={16} /> : "Apply"}
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-800">
                <span>Total</span>
                <span>₹{orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <AnimatePresence>
              <motion.p
                key={paymentMethod}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400"
              >
                {paymentMethod === "cod"
                  ? "💵 You'll pay in cash when your order is delivered"
                  : "🔒 Secure payment powered by Razorpay"}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
