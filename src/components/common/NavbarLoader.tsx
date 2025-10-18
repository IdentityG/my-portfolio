"use client";

import { motion } from "framer-motion";

export default function NavbarLoader() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-coral to-purple rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}