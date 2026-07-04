import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../api/cartApi";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);
      await addToCart(product._id, 1);
      alert("Added to cart");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      await addToCart(product._id, 1);

      navigate("/checkout");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
    return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={product.image?.url}
          alt={product.name}
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Stock badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${
            product.stock > 0
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </div>
      </div>
            <div className="p-5">

        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-500 transition">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <span className="text-xs text-gray-500">
            {product.category}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 text-white font-semibold transition"
          >
            Buy Now
          </button>

        </div>

        {/* View Button */}
        <Link
          to={`/product/${product._id}`}
          className="block mt-3 text-center text-sm text-indigo-600 hover:underline"
        >
          View Details →
        </Link>

      </div>
    </motion.div>
  );
};

export default ProductCard;