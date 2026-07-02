import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  ShoppingCart,
  Zap,
  Heart,
  Star,
} from "lucide-react";

import { addToCart } from "../api/cartApi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

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

      const { data } = await addToCart(
        product._id,
        1
      );

      alert(data.message);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to add to cart"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        buyNow: true,
        product,
        quantity: 1,
      },
    });
  };
    return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image?.url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Sale Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          SALE
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition"
        >
          <Heart size={18} />
        </button>

        {/* Stock Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
              product.stock > 0
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-bold line-clamp-1">
          {product.name}
        </h2>

        <div className="flex items-center mt-2 gap-1">

          <Star
            size={16}
            fill="gold"
            color="gold"
          />

          <span className="font-semibold">
            4.8
          </span>

          <span className="text-gray-400 text-sm">
            (128 Reviews)
          </span>

        </div>

        <p className="text-gray-500 mt-3 h-12 overflow-hidden text-sm">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <div>

            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₹{Math.floor(product.price * 1.25)}
            </p>

          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
            20% OFF
          </span>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-6">

          <Link
            to={`/product/${product._id}`}
            className="flex justify-center items-center gap-1 border border-indigo-600 text-indigo-600 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition"
          >
            <Eye size={16} />
            View
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="flex justify-center items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition disabled:bg-gray-400"
          >
            <ShoppingCart size={16} />
            {loading ? "..." : "Cart"}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex justify-center items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition disabled:bg-gray-400"
          >
            <Zap size={16} />
            Buy
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;