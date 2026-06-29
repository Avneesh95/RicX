import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/product")
      .then((res) => setProducts(res.data.product))
      .catch(console.error);
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-6">

      <h2 className="text-3xl font-bold mb-8">
        Latest Products
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}

      </div>

    </section>
  );
};

export default ProductGrid;