import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Hero Banner */}
      <Hero />

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <Categories />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-10 px-6">
        <div className="mb-10 text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-3">
            Explore our latest arrivals and best-selling products.
          </p>

        </div>

        <ProductGrid />
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Shop With RicX?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">

              <div className="text-5xl mb-4">🚚</div>

              <h3 className="font-bold text-xl">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-3">
                Nationwide shipping with secure packaging.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">

              <div className="text-5xl mb-4">💳</div>

              <h3 className="font-bold text-xl">
                Secure Payments
              </h3>

              <p className="text-gray-500 mt-3">
                Safe and encrypted payment methods.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">

              <div className="text-5xl mb-4">⭐</div>

              <h3 className="font-bold text-xl">
                Quality Products
              </h3>

              <p className="text-gray-500 mt-3">
                Carefully selected premium products.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow text-center">

              <div className="text-5xl mb-4">🛡️</div>

              <h3 className="font-bold text-xl">
                Trusted Store
              </h3>

              <p className="text-gray-500 mt-3">
                Thousands of happy customers across India.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
};

export default Home;