import { Link } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../api/cartApi";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const { data } = await addToCart(product._id, 1);

      alert(data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src={product.image?.url}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 h-12 overflow-hidden">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span
            className={`text-sm font-semibold ${
              product.stock > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

        </div>

        <div className="mt-5 flex gap-3">

          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;