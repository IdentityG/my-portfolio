"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

interface AnimatedLogoProps {
  isAgencyMode: boolean;
}

export default function AnimatedLogo({ isAgencyMode }: AnimatedLogoProps) {
  return (
    <motion.div 
      className="relative w-20 h-20 md:w-24 md:h-24"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Rotating Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-coral/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Glow */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-coral/20 via-purple/20 to-mint/20 backdrop-blur-sm"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={isAgencyMode ? "agency" : "personal"}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          {!isAgencyMode ? (
            <span className="font-display font-bold text-3xl md:text-4xl text-gradient">
              EG
            </span>
          ) : (
            <span className="font-display font-bold text-2xl md:text-3xl text-gradient">
              IS
            </span>
          )}
        </motion.div>
      </div>
      
      {/* Orbiting Dot */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-coral rounded-full" />
      </motion.div>
      
      {/* Icon Accent */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {isAgencyMode ? (
          <Sparkles className="w-4 h-4 text-mint" />
        ) : (
          <Zap className="w-4 h-4 text-coral" />
        )}
      </motion.div>
    </motion.div>
  );
}