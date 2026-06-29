const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition">

      <img
        src={product.image.url}
        alt={product.name}
        className="h-56 w-full object-cover rounded-t-xl"
      />

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2">
          ₹ {product.price}
        </p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Product
        </button>

      </div>

    </div>
  );
};

export default ProductCard;