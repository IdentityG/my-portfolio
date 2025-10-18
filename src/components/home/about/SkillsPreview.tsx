"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Palette, Globe, Smartphone, Database, Cloud,
  Layers, Zap, Box, Figma, Cpu, Braces
} from "lucide-react";

interface SkillsPreviewProps {
  isAgencyMode: boolean;
}

export default function SkillsPreview({ isAgencyMode }: SkillsPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const personalSkills = [
    { name: "React/Next.js", level: 95, category: "frontend", icon: Code2, color: "from-[#61DAFB] to-[#000000]" },
    { name: "TypeScript", level: 90, category: "frontend", icon: Braces, color: "from-[#3178C6] to-[#235A97]" },
    { name: "UI/UX Design", level: 88, category: "design", icon: Palette, color: "from-coral to-sunset" },
    { name: "Tailwind CSS", level: 92, category: "frontend", icon: Layers, color: "from-[#06B6D4] to-[#0E7490]" },
    { name: "Node.js", level: 85, category: "backend", icon: Database, color: "from-[#339933] to-[#026e00]" },
    { name: "Figma", level: 90, category: "design", icon: Figma, color: "from-[#F24E1E] to-[#A259FF]" },
    { name: "GSAP/Framer", level: 88, category: "frontend", icon: Zap, color: "from-mint to-purple" },
    { name: "GraphQL", level: 82, category: "backend", icon: Globe, color: "from-[#E10098] to-[#C50084]" }
  ];

  const agencySkills = [
    { name: "Web Development", level: 95, category: "development", icon: Code2, color: "from-coral to-purple" },
    { name: "Brand Design", level: 92, category: "design", icon: Palette, color: "from-sunset to-coral" },
    { name: "Mobile Apps", level: 88, category: "development", icon: Smartphone, color: "from-mint to-coral" },
    { name: "SEO Optimization", level: 90, category: "marketing", icon: Globe, color: "from-purple to-mint" },
    { name: "Cloud Solutions", level: 85, category: "development", icon: Cloud, color: "from-coral to-sunset" },
    { name: "E-commerce", level: 93, category: "development", icon: Box, color: "from-mint to-purple" },
    { name: "UI/UX Design", level: 94, category: "design", icon: Layers, color: "from-sunset to-purple" },
    { name: "Performance", level: 91, category: "development", icon: Cpu, color: "from-coral to-mint" }
  ];

  const skills = isAgencyMode ? agencySkills : personalSkills;
  const categories = ["all", ...new Set(skills.map(s => s.category))];
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <motion.h3 
          className="text-4xl md:text-5xl font-display font-bold text-cream mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gradient">
            {isAgencyMode ? "Our Expertise" : "Technical Skills"}
          </span>
        </motion.h3>
        <motion.p 
          className="text-steel/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {isAgencyMode 
            ? "Comprehensive solutions across all digital touchpoints"
            : "Mastering the tools that power modern web experiences"
          }
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`relative px-5 py-2.5 rounded-xl transition-all overflow-hidden ${
              selectedCategory === category
                ? "text-cream"
                : "text-steel/60 hover:text-cream backdrop-blur-sm bg-midnight/30 border border-coral/10 hover:border-coral/30"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCategory === category && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-coral to-purple"
                layoutId="activeCategory"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative capitalize text-sm font-medium">
              {category}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative backdrop-blur-sm bg-midnight/40 rounded-2xl p-5 border border-coral/10 hover:border-coral/30 transition-colors overflow-hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,107,107,0.1), rgba(114,9,183,0.1))`
                  }}
                />

                <div className="relative z-10">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                      animate={hoveredSkill === skill.name ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-cream" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-cream text-sm">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-steel/60 capitalize">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-2 bg-midnight/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Percentage */}
                    <motion.span 
                      className="absolute -top-7 right-0 text-xs font-bold text-coral"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}