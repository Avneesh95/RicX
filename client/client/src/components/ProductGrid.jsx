import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.product);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  const filteredProducts = useMemo(() => {
    let temp = [...products];

    // Search
    temp = temp.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Category
    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    // Price
    temp = temp.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sort === "Low") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "High") {
      temp.sort((a, b) => b.price - a.price);
    }

    if (sort === "Newest") {
      temp.reverse();
    }

    return temp;
  }, [products, search, category, sort, maxPrice]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex flex-col lg:flex-row gap-6 justify-between mb-10">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 w-full lg:w-96"
        />

        <div className="flex gap-4 flex-wrap">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="Newest">Newest</option>
            <option value="Low">Price Low → High</option>
            <option value="High">Price High → Low</option>
          </select>

        </div>

      </div>

      {/* Price Filter */}

      <div className="mb-10">

        <label className="font-semibold">
          Maximum Price :
        </label>

        <span className="ml-3 font-bold text-indigo-600">
          ₹{maxPrice}
        </span>

        <input
          type="range"
          min="100"
          max="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full mt-3"
        />

      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl py-20">
            No Products Found
          </div>
        )}

      </div>

    </section>
  );
}