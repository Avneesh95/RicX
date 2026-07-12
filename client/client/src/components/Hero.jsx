import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";


import { getHeroCoupon } from "../api/couponApi";

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

const stats = [
  {
    number: "15K+",
    title: "Products",
  },
  {
    number: "100K+",
    title: "Customers",
  },
  {
    number: "4.9★",
    title: "Reviews",
  },
];

const HeroSection = () => {
  const [heroCoupon, setHeroCoupon] = useState(null);
  const dots = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      })),
    [],
  );

  const scrollToProducts = () => {
    const section = document.getElementById("products");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white dark:from-black dark:via-gray-950 dark:to-slate-950">
      {/* Aurora Background */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[130px] animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-pink-500/20 blur-[150px] animate-pulse" />

        <div className="absolute top-1/3 left-1/2 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      {/* Animated Dots */}

      <div className="absolute inset-0 opacity-20">
        {dots.map((dot, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white animate-pulse"
            style={{
              top: dot.top,
              left: dot.left,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}

          <motion.div variants={fadeLeft} initial="hidden" animate="visible">
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl shadow-2xl"
            >
              <span className="animate-bounce text-2xl">🔥</span>

              <span className="font-semibold tracking-wide text-yellow-300">
                Biggest Sale • Up to 70% OFF
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="mt-10 text-5xl font-black leading-tight md:text-7xl"
            >
              Upgrade Your
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                Shopping Experience
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
              }}
              className="mt-8 max-w-xl text-lg leading-8 text-gray-300"
            >
              Experience premium shopping with exclusive deals, lightning-fast
              delivery, secure payments, and carefully selected products—all in
              one place.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
              }}
              className="mt-12 flex flex-wrap gap-5"
            >
              <button
                onClick={scrollToProducts}
                className="group rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-8 py-4 font-bold shadow-2xl transition duration-300 hover:scale-105"
              >
                Shop Now
                <span className="ml-2 inline-block transition group-hover:translate-x-2">
                  →
                </span>
              </button>

              <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-xl transition duration-300 hover:bg-white hover:text-black">
                Browse Collection
              </button>
            </motion.div>

            {/* Features */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.2,
              }}
              className="mt-12 flex flex-wrap gap-8"
            >
              <div className="flex items-center gap-2">
                🚚
                <span className="text-gray-300">Free Shipping</span>
              </div>

              <div className="flex items-center gap-2">
                🔒
                <span className="text-gray-300">Secure Payment</span>
              </div>

              <div className="flex items-center gap-2">
                ↩️
                <span className="text-gray-300">Easy Returns</span>
              </div>
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.4,
              }}
              className="mt-14 grid grid-cols-3 gap-5"
            >
              {stats.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-xl"
                >
                  <h2 className="text-3xl font-black">{item.number}</h2>

                  <p className="mt-2 text-gray-300">{item.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/* RIGHT */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center mt-16 lg:mt-0"
          >
            {/* Background Glow */}

            <div className="absolute h-[550px] w-[550px] rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-30 blur-[140px] animate-pulse" />

            {/* Rotating Rings */}

            <div
              className="absolute h-[470px] w-[470px] rounded-full border border-white/10 animate-spin"
              style={{
                animationDuration: "25s",
              }}
            />

            <div
              className="absolute h-[560px] w-[560px] rounded-full border border-indigo-500/20 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "40s",
              }}
            />

            {/* Main Image */}

            <motion.img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
              alt="Shopping"
              whileHover={{
                scale: 1.05,
                rotate: -2,
              }}
              animate={{
                y: [0, -18, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-20 w-full max-w-lg rounded-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
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
              className="absolute left-0 top-8 z-30 rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:left-4 lg:left-0"
            >
              <h3 className="text-4xl font-black text-red-500">70%</h3>

              <p className="font-semibold text-gray-800">Mega Discount</p>

              <span className="text-sm text-gray-500">Limited Time Offer</span>
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
              className="absolute bottom-8 right-0 z-30 rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:right-4 lg:right-0"
            >
              <div className="text-xl text-yellow-500">⭐⭐⭐⭐⭐</div>

              <p className="font-bold text-gray-800">4.9 / 5 Rating</p>

              <span className="text-sm text-gray-500">
                Trusted by 100K+ Customers
              </span>
            </motion.div>

            {/* Delivery Card */}

            <motion.div
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute right-12 top-4 z-30 rounded-3xl bg-indigo-600 px-6 py-4 text-white shadow-2xl"
            >
              <p className="text-2xl">🚚</p>

              <p className="font-bold">Free Delivery</p>

              <span className="text-sm text-indigo-100">Across India</span>
            </motion.div>

            {/* Floating Product Badge */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -left-4 bottom-24 z-30 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="text-3xl">🛍️</p>

              <p className="mt-2 font-semibold">15K+ Products</p>
            </motion.div>

            {/* Customer Badge */}

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -right-6 top-1/2 z-30 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="text-3xl">❤️</p>

              <p className="mt-2 font-semibold">100K Happy Customers</p>
            </motion.div>

            {/* Scroll Indicator */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute -bottom-20 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-gray-300"
            >
              <span className="text-sm uppercase tracking-widest">Scroll</span>

              <div className="mt-2 flex h-10 w-6 justify-center rounded-full border-2 border-white">
                <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-white"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
