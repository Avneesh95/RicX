import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}

        {/* Stock Badge */}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}

        {/* Hover Icons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col gap-2">

          <button className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
            <Heart size={18} />
          </button>

          <button className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition">
            <Eye size={18} />
          </button>

        </div>
      </div>

      {/* Details */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="text-lg font-bold mt-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-3 gap-1">

          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < product.rating ? "#FFD700" : "none"}
              color={i < product.rating ? "#FFD700" : "#D1D5DB"}
            />
          ))}

          <span className="ml-2 text-sm text-gray-500">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}

        </div>

        {/* Button */}
        <button
          disabled={!product.inStock}
          className={`mt-5 w-full py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition
          
          ${
            product.inStock
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-600"
          }`}
        >
          <ShoppingCart size={18} />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>

      </div>
    </div>
  );
};

export default ProductCard;