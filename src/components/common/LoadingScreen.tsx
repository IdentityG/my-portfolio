"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Animated Logo */}
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-coral to-purple rounded-2xl" />
          <div className="absolute inset-2 bg-ink rounded-xl flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-gradient">EG</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-center mt-8 text-steel text-sm uppercase tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Experience...
        </motion.p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-coral rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}