"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  projectCount: number;
}

export default function ProjectFilters({
  categories,
  activeFilter,
  onFilterChange,
  projectCount
}: ProjectFiltersProps) {
  return (
    <motion.div 
      className="flex flex-wrap items-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`relative px-6 py-2 rounded-full font-medium text-sm transition-all ${
            activeFilter === category
              ? "text-cream"
              : "text-steel hover:text-cream"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeFilter === category && (
            <motion.div
              className="absolute inset-0 glass-strong rounded-full"
              layoutId="activeFilter"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative capitalize">
            {category}
            {category === activeFilter && (
              <span className="ml-2 text-xs text-coral">({projectCount})</span>
            )}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}