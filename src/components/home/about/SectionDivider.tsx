"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "dots" | "line" | "wave" | "minimal" | "gradient" | "zigzag" | "pulse";
  className?: string;
}

export default function SectionDivider({ variant = "dots", className = "" }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className={`relative py-16 flex items-center justify-center overflow-hidden ${className}`}>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-coral to-purple"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={`relative py-12 flex items-center justify-center overflow-hidden ${className}`}>
        <div className="relative w-full max-w-4xl">
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-coral to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-coral rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 w-2 h-2 bg-coral rounded-full"
              animate={{ scale: [1, 3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-32 overflow-hidden ${className}`}>
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.path
            d="M0,56 C150,100 350,0 600,56 C850,112 1050,0 1200,56 L1200,120 L0,120 Z"
            fill="none"
            stroke="url(#wave-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(255, 107, 107)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="rgb(114, 9, 183)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(78, 205, 196)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </motion.svg>
        
        {/* Animated particles along the wave */}
        <motion.div
          className="absolute top-14 left-0 w-3 h-3 bg-coral rounded-full"
          animate={{
            x: [0, 1200],
            y: [0, -20, 0, 20, 0]
          }}
          transition={{
            x: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={`relative py-8 overflow-hidden ${className}`}>
        <motion.div
          className="h-1 bg-gradient-to-r from-coral via-purple to-mint"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.3, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
        <motion.div
          className="absolute inset-0 h-1 bg-gradient-to-r from-coral via-purple to-mint blur-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </div>
    );
  }

  if (variant === "zigzag") {
    return (
      <div className={`relative py-12 overflow-hidden ${className}`}>
        <motion.svg
          className="w-full h-8"
          viewBox="0 0 1200 40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.path
            d="M0,20 L40,5 L80,20 L120,5 L160,20 L200,5 L240,20 L280,5 L320,20 L360,5 L400,20 L440,5 L480,20 L520,5 L560,20 L600,5 L640,20 L680,5 L720,20 L760,5 L800,20 L840,5 L880,20 L920,5 L960,20 L1000,5 L1040,20 L1080,5 L1120,20 L1160,5 L1200,20"
            stroke="url(#zigzag-gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="zigzag-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(255, 107, 107)" />
              <stop offset="100%" stopColor="rgb(78, 205, 196)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`relative py-16 flex items-center justify-center ${className}`}>
        <motion.div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-coral/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-purple/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-mint/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-coral to-purple rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  // minimal variant (default)
  return (
    <div className={`relative py-12 flex items-center justify-center ${className}`}>
      <motion.div
        className="relative w-16 h-16"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 180 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border border-coral/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-12 h-12 rounded-full border border-purple/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 w-8 h-8 rounded-full border border-mint/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-coral to-purple rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}