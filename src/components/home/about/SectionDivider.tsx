// components/home/utils/SectionDivider.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "dots" | "line" | "wave" | "minimal";
  className?: string;
}

export default function SectionDivider({ variant = "dots", className = "" }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className={`relative h-32 flex items-center justify-center overflow-hidden ${className}`}>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-coral to-purple"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={`relative h-20 flex items-center justify-center overflow-hidden ${className}`}>
        <motion.div
          className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-coral to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <motion.svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="url(#gradient)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(255, 107, 107)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(114, 9, 183)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(78, 205, 196)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  // minimal variant
  return (
    <div className={`relative h-16 flex items-center justify-center ${className}`}>
      <motion.div
        className="w-12 h-12 rounded-full border border-coral/20"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 180 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-coral/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}