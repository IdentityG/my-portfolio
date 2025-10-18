"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechStackDisplayProps {
  isAgencyMode: boolean;
}

export default function TechStackDisplay({ isAgencyMode }: TechStackDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("frontend");

  const techStack = {
    frontend: [
      { name: "React", logo: "⚛️", level: 95 },
      { name: "Next.js", logo: "▲", level: 93 },
      { name: "TypeScript", logo: "TS", level: 90 },
      { name: "Tailwind", logo: "🎨", level: 92 },
      { name: "GSAP", logo: "🎭", level: 88 },
      { name: "Three.js", logo: "3D", level: 75 }
    ],
    backend: [
      { name: "Node.js", logo: "🟢", level: 85 },
      { name: "Express", logo: "E", level: 88 },
      { name: "PostgreSQL", logo: "🐘", level: 82 },
      { name: "MongoDB", logo: "🍃", level: 80 },
      { name: "GraphQL", logo: "◈", level: 78 },
      { name: "Redis", logo: "⬢", level: 75 }
    ],
    design: [
      { name: "Figma", logo: "F", level: 92 },
      { name: "Adobe XD", logo: "Xd", level: 85 },
      { name: "Photoshop", logo: "Ps", level: 88 },
      { name: "Illustrator", logo: "Ai", level: 82 },
      { name: "After Effects", logo: "Ae", level: 75 },
      { name: "Sketch", logo: "💎", level: 80 }
    ],
    tools: [
      { name: "Git", logo: "🔀", level: 90 },
      { name: "Docker", logo: "🐳", level: 82 },
      { name: "AWS", logo: "☁️", level: 78 },
      { name: "Vercel", logo: "▲", level: 88 },
      { name: "VS Code", logo: "💻", level: 95 },
      { name: "Postman", logo: "📮", level: 85 }
    ]
  };

  return (
    <div className="glass rounded-3xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-cream mb-4">
          {isAgencyMode ? "Our Tech Stack" : "Technologies I Use"}
        </h3>
        <p className="text-steel max-w-2xl mx-auto">
          {isAgencyMode 
            ? "Cutting-edge technologies to power your digital solutions"
            : "Modern tools and frameworks for building exceptional products"
          }
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {Object.keys(techStack).map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-coral to-purple text-cream"
                : "glass text-steel hover:text-cream"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Tech Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {techStack[selectedCategory as keyof typeof techStack].map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring" }}
            >
              <motion.div
                className="glass rounded-xl p-4 text-center cursor-pointer"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{tech.logo}</div>
                <div className="text-sm font-medium text-cream mb-2">{tech.name}</div>
                
                {/* Progress Bar */}
                <div className="h-1 bg-midnight/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-coral to-purple"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                
                <div className="text-xs text-steel mt-1">{tech.level}%</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}