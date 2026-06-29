import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-3xl font-extrabold">
          <span className="text-black">Ric</span>
          <span className="text-blue-600">X</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">
          <button className="relative">
            <Heart className="hover:text-red-500 transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>

          <button className="relative">
            <ShoppingCart className="hover:text-blue-600 transition" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition">
            <User size={18} />
            Login
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-5 py-4 space-y-4">
            {/* Search */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 w-full"
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}

            <div className="flex justify-around pt-4 border-t">
              <Heart />
              <ShoppingCart />
              <User />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;