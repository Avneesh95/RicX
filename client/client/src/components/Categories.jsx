const categories = [
  "Mobiles",
  "Laptops",
  "Fashion",
  "Shoes",
  "Accessories",
  "Gaming",
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto py-14 px-6">

      <h2 className="text-3xl font-bold mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

        {categories.map((item) => (
          <div
            key={item}
            className="bg-white shadow rounded-xl py-8 text-center cursor-pointer hover:bg-blue-600 hover:text-white transition"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;