"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";

interface ModeToggleProps {
  isAgencyMode: boolean;
  onChange: (value: boolean) => void;
}

export default function ModeToggle({ isAgencyMode, onChange }: ModeToggleProps) {
  return (
    <motion.div 
      className="relative backdrop-blur-sm bg-midnight/40 rounded-full p-1 flex items-center gap-1 border border-coral/10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={{ borderColor: "rgba(255, 107, 107, 0.3)" }}
    >
      <button
        onClick={() => onChange(false)}
        className={`relative px-5 py-2.5 rounded-full transition-all duration-300 ${
          !isAgencyMode ? "text-cream" : "text-steel/60"
        }`}
      >
        {!isAgencyMode && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-coral/80 to-sunset/80 rounded-full"
            layoutId="activeMode"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative flex items-center gap-2 text-sm font-medium">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Personal</span>
        </span>
      </button>

      <button
        onClick={() => onChange(true)}
        className={`relative px-5 py-2.5 rounded-full transition-all duration-300 ${
          isAgencyMode ? "text-cream" : "text-steel/60"
        }`}
      >
        {isAgencyMode && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-coral/80 to-sunset/80 rounded-full"
            layoutId="activeMode"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative flex items-center gap-2 text-sm font-medium">
          <Building2 className="w-4 h-4" />
          <span className="hidden sm:inline">Agency</span>
        </span>
      </button>
    </motion.div>
  );
}