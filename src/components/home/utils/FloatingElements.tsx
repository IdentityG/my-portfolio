"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingElementsProps {
  isAgencyMode: boolean;
}

export default function FloatingElements({ isAgencyMode }: FloatingElementsProps) {
  const shapes = [
    { size: 40, top: "15%", left: "10%", delay: 0 },
    { size: 60, top: "25%", right: "15%", delay: 1 },
    { size: 50, bottom: "20%", left: "20%", delay: 2 },
    { size: 45, bottom: "30%", right: "10%", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <div
            className={`w-full h-full rounded-full border opacity-20 ${
              isAgencyMode 
                ? index % 2 === 0 
                  ? "border-mint" 
                  : "border-sunset"
                : index % 2 === 0 
                  ? "border-coral" 
                  : "border-purple"
            }`}
            style={{
              borderWidth: index % 2 === 0 ? "2px" : "1px",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}