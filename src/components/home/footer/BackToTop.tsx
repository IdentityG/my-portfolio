"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Rocket } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-steel/20"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: 150.8,
                strokeDashoffset: 150.8 - (150.8 * scrollProgress) / 100
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#7209B7" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Button Content */}
          <div className="relative w-14 h-14 rounded-full glass-strong flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-coral to-purple opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            <motion.div
              className="relative text-cream"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {scrollProgress > 90 ? (
                <Rocket className="w-5 h-5" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </motion.div>
          </div>
          
          {/* Tooltip */}
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 glass-strong rounded text-xs text-cream whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            Back to top
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}