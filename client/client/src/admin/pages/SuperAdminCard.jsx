import { motion } from "framer-motion";

import {
  Users,
  ShieldCheck,
  UserX,
  UserCheck,
} from "lucide-react";

export default function DashboardCards({
  admins = [],
  users = [],
}) {

  const blockedUsers = users.filter(
    (u) => u.isBlocked
  ).length;

  const activeUsers =
    users.length - blockedUsers;

  const cards = [
    {
      title: "Total Admins",
      value: admins.length,
      icon: ShieldCheck,
      gradient:
        "from-indigo-600 to-purple-600",
    },

    {
      title: "Customers",
      value: users.length,
      icon: Users,
      gradient:
        "from-green-500 to-emerald-600",
    },

    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: UserX,
      gradient:
        "from-red-500 to-pink-600",
    },

    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      gradient:
        "from-cyan-500 to-blue-600",
    },
  ];

  return (

    <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.15,
            }}

            whileHover={{
              y: -8,
              scale: 1.03,
            }}

            className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${card.gradient} text-white shadow-2xl`}
          >

            {/* Glow */}

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />

            <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-white/10" />

            <div className="relative z-10 p-7">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-white/80">

                    {card.title}

                  </p>

                  <motion.h2
                    initial={{
                      scale: 0,
                    }}

                    animate={{
                      scale: 1,
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 120,
                    }}

                    className="mt-3 text-5xl font-black"
                  >

                    {card.value}

                  </motion.h2>

                </div>

                <div className="rounded-full bg-white/20 p-4 backdrop-blur">

                  <Icon size={34} />

                </div>

              </div>

              <div className="mt-8 flex items-center justify-between">

                <span className="text-sm text-white/80">

                  Platform Statistics

                </span>

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs">

                  Live

                </span>

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );

}