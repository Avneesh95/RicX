import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image?.url}
          className="rounded-xl shadow-lg"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <h2 className="text-2xl text-indigo-600 font-bold mt-6">
            ₹{product.price}
          </h2>

          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}