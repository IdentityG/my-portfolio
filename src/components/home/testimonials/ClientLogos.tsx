"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ClientLogos() {
  // Placeholder logos - replace with actual client logos
  const logos = [
    { name: "TechCorp", initial: "TC" },
    { name: "InnovateLabs", initial: "IL" },
    { name: "Creative Co", initial: "CC" },
    { name: "Digital Pro", initial: "DP" },
    { name: "StartupX", initial: "SX" },
    { name: "GlobalTech", initial: "GT" },
    { name: "FutureSoft", initial: "FS" },
    { name: "CloudBase", initial: "CB" }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-cream mb-2">
          Trusted By Leading Brands
        </h3>
        <p className="text-steel">
          Proud to work with innovative companies worldwide
        </p>
      </div>

      {/* Logo Grid with Infinite Scroll */}
      <div className="relative overflow-hidden">
        <div className="flex gap-8">
          {/* First set */}
          <motion.div
            className="flex gap-8 flex-shrink-0"
            animate={{ x: [0, -100 + "%"] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-1`}
                className="w-32 h-20 glass-subtle rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <span className="text-2xl font-bold text-steel/50">
                  {logo.initial}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Duplicate for seamless loop */}
          <motion.div
            className="flex gap-8 flex-shrink-0"
            animate={{ x: [0, -100 + "%"] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-2`}
                className="w-32 h-20 glass-subtle rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <span className="text-2xl font-bold text-steel/50">
                  {logo.initial}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent pointer-events-none" />
      </div>
    </div>
  );
}