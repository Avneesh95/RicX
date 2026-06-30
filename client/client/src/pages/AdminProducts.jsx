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
  // const fetchProducts = async () => {
  //   try {
  //     console.log("📦 Fetching products...");
  //     const res = await api.get("/products");
  //     console.log("📦 RAW RESPONSE:", res.data);

  //     const list = res.data.product || res.data.products || [];
  //     console.log("📦 PRODUCTS LIST:", list);

  //     setProducts(list);
  //   } catch (err) {
  //     console.error("❌ FETCH ERROR:", err.response?.data || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // Inside AdminProducts.jsx, update your fetch function:
const fetchProducts = async () => {
  try {
    console.log("📦 Fetching products...");
    const res = await api.get("/products");
    
    const list = res.data.product || res.data.products || [];
    setProducts(list);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err.response?.data || err.message);
    // Add this temporary alert to catch the exact backend response code!
    alert(`Backend Error: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE WITH GUARD =================
  const handleDelete = async (id, name) => {
    // Prevent accidental layout deletions
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

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
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (product) => {
    console.log("✏️ OPEN EDIT:", product);
    setSelected({ ...product }); // Fixed: Shallow copy prevents early mutation in list background
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
  const handleUpdate = async (e) => {
    e.preventDefault(); // Allows form onSubmit to fire instead of basic onClick
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
      alert(err.response?.data?.message || "Failed to update product.");
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
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, update, and remove your storefront items</p>
        </div>

        <input
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg w-full sm:w-64 transition shadow-sm"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCT LAYOUT LIST */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-xl">
            No products match your criteria.
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center bg-white border border-gray-200 hover:border-gray-300 shadow-sm p-4 rounded-xl transition duration-150"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getImage(p.image)}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-lg bg-gray-100 border"
                />

                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">{p.name}</h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">₹{p.price}</span>
                    <span>•</span>
                    <span>Stock: <span className={p.stock > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>{p.stock || 0}</span></span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{p.category || "Uncategorized"}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-lg transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id, p.name)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MODAL WINDOW CONTAINER ================= */}
      {editOpen && selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform overflow-hidden transition-all flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
              <button 
                onClick={() => setEditOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Product Title</label>
                <input
                  name="name"
                  value={selected.name || ""}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2.5 w-full rounded-lg text-sm"
                  placeholder="Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Price (INR)</label>
                  <input
                    name="price"
                    type="number"
                    value={selected.price || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2.5 w-full rounded-lg text-sm"
                    placeholder="Price"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Stock Availability</label>
                  <input
                    name="stock"
                    type="number"
                    value={selected.stock || ""}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2.5 w-full rounded-lg text-sm"
                    placeholder="Stock"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category Classification</label>
                <input
                  name="category"
                  value={selected.category || ""}
                  onChange={handleChange}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2.5 w-full rounded-lg text-sm"
                  placeholder="Category"
                />
              </div>

              {/* Action Operations Tray */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium shadow transition"
                >
                  {saving ? "Saving Changes..." : "Save Product"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}