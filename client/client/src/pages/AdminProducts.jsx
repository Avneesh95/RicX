import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // EDIT STATE
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      console.log("📦 Fetching products...");

      const res = await api.get("/products");

      console.log("📦 RAW RESPONSE:", res.data);

      const list = res.data.product || res.data.products || [];

      console.log("📦 PRODUCTS LIST:", list);

      setProducts(list);
    } catch (err) {
      console.error("❌ FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      console.log("🗑 DELETE ID:", id);

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));

      console.log("✅ Deleted successfully");
    } catch (err) {
      console.error("❌ DELETE ERROR:", err.response?.data || err.message);
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (product) => {
    console.log("✏️ OPEN EDIT:", product);

    setSelected(product);
    setEditOpen(true);
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setSelected((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    try {
      setSaving(true);

      console.log("🚀 UPDATING PRODUCT:", selected);

      const res = await api.put(
        `/products/${selected._id}`,
        selected,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ UPDATE RESPONSE:", res.data);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selected._id ? res.data.product || selected : p
        )
      );

      setEditOpen(false);
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  // ================= IMAGE HANDLER =================
  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/100";

    if (typeof img === "object") return img.url;

    return `http://localhost:4000/uploads/${img}`;
  };

  // ================= FILTER =================
  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-500">Loading products...</div>;
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Products</h1>

        <input
          className="border px-3 py-2 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCT LIST */}
      <div className="grid gap-4">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >

            <div className="flex items-center gap-4">
              <img
                src={getImage(p.image)}
                className="w-14 h-14 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-500">
                  ₹{p.price}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editOpen && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Product
            </h2>

            <input
              name="name"
              value={selected.name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Name"
            />

            <input
              name="price"
              value={selected.price}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Price"
            />

            <input
              name="stock"
              value={selected.stock}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Stock"
            />

            <input
              name="category"
              value={selected.category}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Category"
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setEditOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                {saving ? "Saving..." : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}