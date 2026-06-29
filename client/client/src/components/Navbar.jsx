import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-600">
          RicX Store
        </h1>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="/">Home</a>
          <a href="/">Products</a>
          <a href="/">Categories</a>
          <a href="/">Orders</a>
        </div>

        <div className="flex gap-5">
          <ShoppingCart className="cursor-pointer" />
          <User className="cursor-pointer" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;