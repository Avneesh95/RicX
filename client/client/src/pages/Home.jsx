import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Categories from "../components/Categories.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Footer from "../components/Footer.jsx";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero />

      <Categories />

      <ProductGrid />

      <Footer />
    </div>
  );
};

export default Home;