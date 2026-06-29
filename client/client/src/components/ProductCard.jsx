import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">

      <img
        src={product?.image?.url}
        alt={product?.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {product?.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {product?.description?.slice(0, 60)}...
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-indigo-600 font-bold">
            ₹{product?.price}
          </span>

          <Link
            to={`/product/${product?._id}`}
            className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
          >
            View
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;