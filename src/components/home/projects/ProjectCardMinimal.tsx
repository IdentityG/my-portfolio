"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardMinimalProps {
  project: any;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  isAgencyMode: boolean;
}

export default function ProjectCardMinimal({ 
  project, 
  index, 
  isHovered, 
  onHover, 
  onClick,
  isAgencyMode 
}: ProjectCardMinimalProps) {
  return (
    <motion.div
      className="project-card group cursor-pointer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden glass-subtle">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />
        
        {/* Content */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-cream text-sm mb-1 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-steel line-clamp-2">
              {project.category}
            </p>
          </div>
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent flex items-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full">
              <p className="text-xs text-cream mb-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-coral">{project.year}</span>
                <ArrowUpRight className="w-4 h-4 text-cream" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}