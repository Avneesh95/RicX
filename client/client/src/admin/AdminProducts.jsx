import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      const data = res.data.product || [];

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (img) => {
    if (!img) return "";

    // Cloudinary image
    if (typeof img === "object") return img.url;

    // local image
    return `http://localhost:4000/uploads/${img}`;
  };

  const deleteProduct = (id) => {
    console.log("DELETE:", id);
    // backend integration later
  };

  if (loading) {
    return (
      <div className="text-gray-500 text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Product Management
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 rounded-lg w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">
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
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* IMAGE */}
                  <td className="p-3">
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-3 font-medium">
                    {p.name}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-3">
                    {p.category}
                  </td>

                  {/* PRICE */}
                  <td className="p-3">
                    ₹{p.price}
                  </td>

                  {/* STOCK */}
                  <td className="p-3">
                    {p.stock}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 space-x-2">

                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminProducts;