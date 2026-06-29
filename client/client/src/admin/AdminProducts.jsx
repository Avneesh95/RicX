import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ================= FETCH ALL ADMIN DATA =================
  const fetchData = async () => {
    try {
      console.log("🚀 Fetching Admin Data...");

      const [productRes, userRes] = await Promise.all([
        api.get("/products"),
        api.get("/auth/users").catch(err => {
          console.log("❌ USERS API ERROR:", err.response?.data || err.message);
          return { data: [] };
        }),
      ]);

      // ================= PRODUCTS DEBUG =================
      console.log("📦 RAW PRODUCT RESPONSE:", productRes.data);
      console.log("📦 productRes.data.product:", productRes.data.product);

      const productData = productRes.data.product || [];

      // ================= USERS DEBUG =================
      console.log("👤 RAW USERS RESPONSE:", userRes.data);

      const userData =
        userRes.data?.users ||
        userRes.data?.data ||
        userRes.data ||
        [];

      console.log("👤 FINAL USERS ARRAY:", userData);

      setProducts(productData);
      setUsers(userData);
    } catch (err) {
      console.log("❌ ADMIN FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SEARCH =================
  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= IMAGE =================
  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img === "object") return img.url;
    return `http://localhost:4000/uploads/${img}`;
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    try {
      console.log("🗑 Deleting product:", id);

      setActionLoading(id);

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));

      console.log("✅ Deleted successfully");
    } catch (err) {
      console.log("❌ DELETE ERROR:", err.response?.data || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ================= EDIT =================
  const openEdit = (product) => {
    console.log("✏️ EDIT OPEN:", product);
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      console.log("✏️ UPDATE PAYLOAD:", selectedProduct);

      const res = await api.put(
        `/products/${selectedProduct._id}`,
        selectedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ UPDATE RESPONSE:", res.data);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? selectedProduct : p
        )
      );

      setIsEditOpen(false);
    } catch (err) {
      console.log("❌ UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="p-6 text-gray-500">Loading admin data...</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* ================= PRODUCTS ================= */}
      <div>
        <h1 className="text-2xl font-bold mb-4">
          📦 Product Management
        </h1>

        <input
          className="border px-3 py-2 rounded w-64 mb-4"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b">

                  <td className="p-3">
                    <img
                      src={getImageUrl(p.image)}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.stock}</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      {actionLoading === p._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ================= USERS ================= */}
      <div>
        <h1 className="text-2xl font-bold mb-4">
          👤 Users (Debug Panel)
        </h1>

        <div className="bg-white shadow rounded-xl p-4">
          {users.length > 0 ? (
            users.map((u, idx) => (
              <div
                key={u._id || idx}
                className="flex justify-between border-b py-2"
              >
                <span>{u.name || "No Name"}</span>
                <span className="text-gray-500">{u.email}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              No users OR API not working (check console)
            </p>
          )}
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[400px] space-y-3">

            <h2 className="text-xl font-bold">Edit Product</h2>

            <input
              name="name"
              value={selectedProduct.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="price"
              value={selectedProduct.price}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="stock"
              value={selectedProduct.stock}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <input
              name="category"
              value={selectedProduct.category}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-gray-400 px-3 py-1 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-600 px-3 py-1 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;