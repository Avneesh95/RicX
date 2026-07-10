import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts(page, 8);

      setProducts(data.product);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
  };

  const getPagination = () => {
    const pages = [];
    const delta = 1;

    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let temp = [...products];

    temp = temp.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    temp = temp.filter((p) => p.price <= maxPrice);

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
      <div className="text-center py-20 text-lg font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Search + Filter */}

      <div className="flex flex-col lg:flex-row gap-6 justify-between mb-10">
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

      {/* Price */}

      <div className="mb-10">
        <label className="font-semibold">Maximum Price :</label>

        <span className="ml-3 font-bold text-indigo-600">₹{maxPrice}</span>

        <input
          type="range"
          min="100"
          max="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full mt-3"
        />
      </div>

      {/* Animated Product Grid */}

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl py-20">
              No Products Found
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}

      <div className="flex flex-col items-center mt-14 gap-5">
        <p className="text-gray-600">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>{" "}
          • {totalProducts} Products
        </p>

        <div className="flex gap-2 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            Previous
          </button>

          {getPagination().map((item, index) =>
            item === "..." ? (
              <span
                key={index}
                className="w-11 h-11 flex items-center justify-center text-gray-400 font-bold"
              >
                ...
              </span>
            ) : (
              <motion.button
                key={index}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changePage(item)}
                className={`w-11 h-11 rounded-xl font-semibold transition-all duration-300 ${
                  page === item
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
                }`}
              >
                {item}
              </motion.button>
            ),
          )}

          <button
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
