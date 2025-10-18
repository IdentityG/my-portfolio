// utils/RevealOnScroll.tsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({ 
  children, 
  delay = 0,
  className = "" 
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={
        isInView 
          ? { opacity: 1, y: 0, filter: "blur(0px)" } 
          : { opacity: 0, y: 50, filter: "blur(10px)" }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}