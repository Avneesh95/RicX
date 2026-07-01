import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================
  // Fetch Products
  // ===========================
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.product || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===========================
  // Delete Product
  // ===========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Manage Products
          </h1>

          <p className="text-gray-500 mt-1">
            Total Products : {products.length}
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </Link>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Image
              </th>

              <th className="px-5 py-4 text-left">
                Name
              </th>

              <th className="px-5 py-4 text-left">
                Category
              </th>

              <th className="px-5 py-4 text-left">
                Price
              </th>

              <th className="px-5 py-4 text-left">
                Stock
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <img
                      src={product.image?.url}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="px-5 py-4">
                    {product.category}
                  </td>

                  <td className="px-5 py-4">
                    ₹{product.price}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Products;