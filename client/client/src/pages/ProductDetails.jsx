import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);

      alert("Product added to cart");

    } catch (err) {
      alert(err.response?.data?.message || "Please login first");
    }
  };

  const buyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="text-center py-32 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-12 p-10">

          {/* Image */}

          <div className="flex justify-center items-center">

            <img
              src={product.image?.url}
              alt={product.name}
              className="w-full max-w-lg rounded-xl object-cover"
            />

          </div>

          {/* Details */}

          <div>

            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>

            <h1 className="text-5xl font-bold mt-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-5">

              <span className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="text-gray-500">
                (4.8 Ratings)
              </span>

            </div>

            <h2 className="text-4xl font-bold text-indigo-600 mt-8">
              ₹{product.price}
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              {product.description}
            </p>

            <div className="mt-8">

              <h3 className="font-semibold text-lg">
                Availability
              </h3>

              <span
                className={`font-bold ${
                  product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out of Stock"}
              </span>

            </div>

            {/* Quantity */}

            <div className="flex items-center gap-5 mt-8">

              <span className="font-semibold">
                Quantity
              </span>

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                className="bg-gray-200 w-10 h-10 rounded"
              >
                -
              </button>

              <span className="text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  quantity < product.stock &&
                  setQuantity(quantity + 1)
                }
                className="bg-gray-200 w-10 h-10 rounded"
              >
                +
              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold"
              >
                Add To Cart
              </button>

              <button
                onClick={buyNow}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
              >
                Buy Now
              </button>

            </div>

            {/* Extra */}

            <div className="mt-12 border-t pt-8 space-y-3 text-gray-600">

              <p>🚚 Free Delivery Across India</p>

              <p>🔄 7 Days Replacement</p>

              <p>🛡️ 100% Genuine Products</p>

              <p>💳 Secure Payment</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}