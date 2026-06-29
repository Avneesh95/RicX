// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Github,
//   Linkedin,
//   Mail,
//   Phone,
//   MapPin,
//   ArrowUp,
// } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            Ric<span className="text-blue-500">X</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            Premium shopping experience with secure payments,
            lightning-fast delivery, and top-quality products.
          </p>

          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Twitter, Github, Linkedin].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {[
              "Home",
              "Shop",
              "Categories",
              "About",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-blue-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Customer Support
          </h3>

          <ul className="space-y-3">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex gap-3">
              <MapPin className="text-blue-500" />
              <span>New Delhi, India</span>
            </div>

            <div className="flex gap-3">
              <Phone className="text-blue-500" />
              <span>+91 9876543210</span>
            </div>

            <div className="flex gap-3">
              <Mail className="text-blue-500" />
              <span>support@ricx.com</span>
            </div>

          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} RicX. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
        >
          <ArrowUp size={18} />
          Back to Top
        </button>

      </div>
    </footer>
  );
};

export default Footer;