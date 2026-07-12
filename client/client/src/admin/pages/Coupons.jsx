import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Power,
  Star,
} from "lucide-react";

import {
  getCoupons,
  createCoupon,
  deleteCoupon,
  toggleCoupon,
  setHeroCoupon,
} from "../../api/couponApi";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
  });

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const res = await getCoupons();

      setCoupons(res.data.coupons || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
    const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createCoupon(form);

      alert("Coupon Created Successfully");

      setForm({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        maxDiscount: "",
        usageLimit: "",
        expiryDate: "",
      });

      fetchCoupons();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Coupon Management</h1>
        <p className="text-gray-500">
          Create and manage all coupons.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={form.code}
          onChange={handleChange}
          className="border rounded-xl p-3"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="border rounded-xl p-3"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>

        <input
          type="number"
          name="discountValue"
          placeholder="Discount"
          value={form.discountValue}
          onChange={handleChange}
          className="border rounded-xl p-3"
          required
        />

        <input
          type="number"
          name="minOrderAmount"
          placeholder="Minimum Order"
          value={form.minOrderAmount}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="maxDiscount"
          placeholder="Max Discount"
          value={form.maxDiscount}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="usageLimit"
          placeholder="Usage Limit"
          value={form.usageLimit}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          className="border rounded-xl p-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Coupon
        </button>
      </form>