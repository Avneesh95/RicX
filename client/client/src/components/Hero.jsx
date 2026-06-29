import { motion } from "framer-motion";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative">

        <div className="grid lg:grid-cols-2 items-center gap-16">

          {/* Left Section */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-5 py-2"
            >
              <span className="animate-pulse">🔥</span>
              <span className="text-yellow-300 font-medium">
                Biggest Sale of 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            >
              Shop Smarter
              <br />

              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                Live Better.
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-lg text-gray-300 leading-8 max-w-xl"
            >
              Discover thousands of premium products with exclusive discounts,
              lightning-fast delivery, secure payments, and hassle-free returns.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-10 flex flex-wrap gap-5"
            >
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-105 transition duration-300 shadow-2xl">
                Shop Now →
              </button>

              <button className="px-8 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition duration-300">
                Explore Collection
              </button>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-10 flex flex-wrap gap-6 text-gray-300"
            >
              <div>🚚 Free Shipping</div>
              <div>🔒 Secure Payment</div>
              <div>↩️ Easy Returns</div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-14 grid grid-cols-3 gap-5"
            >
              {[
                ["10K+", "Products"],
                ["50K+", "Happy Users"],
                ["4.9★", "Ratings"],
              ].map(([num, title]) => (
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                  }}
                  key={title}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                >
                  <h2 className="text-3xl font-bold">{num}</h2>
                  <p className="text-gray-300 mt-1">{title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-[130px] opacity-30"></div>

            {/* Main Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
              alt="Shopping"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-3xl w-full max-w-lg border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
            />

            {/* Discount Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute -left-6 top-12 bg-white text-black rounded-2xl shadow-xl px-5 py-4"
            >
              <p className="font-bold text-lg">🎉 40% OFF</p>
              <span className="text-sm text-gray-600">
                Summer Collection
              </span>
            </motion.div>

            {/* Rating Card */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute -right-6 bottom-12 bg-white text-black rounded-2xl shadow-xl px-5 py-4"
            >
              <p className="font-bold">⭐ 4.9 Rating</p>
              <span className="text-sm text-gray-600">
                Trusted by 50K+ customers
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;