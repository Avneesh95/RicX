import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);

      // remove from UI instantly (no refresh needed)
      setProducts(products.filter((p) => p._id !== id));

      alert("Product deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Products
      </h1>

      <div className="grid gap-4">

        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
          >

            <div className="flex items-center gap-4">

              <img
                src={p.image?.url}
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-500">
                  ₹{p.price}
                </p>
              </div>

            </div>

            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}