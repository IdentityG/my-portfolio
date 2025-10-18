"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Eye, Heart, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: any;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  isAgencyMode: boolean;
}

export default function ProjectCard({ 
  project, 
  index, 
  isHovered, 
  onHover, 
  onClick,
  isAgencyMode 
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x * 10);
    mouseY.set(-y * 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card relative group cursor-pointer"
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => {
        onHover(null);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="relative h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Main Card */}
        <div className="glass-subtle rounded-2xl overflow-hidden h-full">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-display font-bold text-coral/20">
                {project.title.charAt(0)}
              </span>
            </div>
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 glass-strong rounded-full">
                <span className="text-xs font-bold text-coral uppercase tracking-wider">
                  Featured
                </span>
              </div>
            )}
            
            {/* Quick Actions */}
            <motion.div
              className="absolute top-4 right-4 flex gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 text-cream" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 text-cream" />
                </a>
              )}
            </motion.div>
            
            {/* View Project CTA */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-cream" />
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-display font-bold text-cream mb-1 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                {isAgencyMode && project.client && (
                  <p className="text-sm text-coral">{project.client}</p>
                )}
              </div>
              <span className="text-xs text-steel">{project.year}</span>
            </div>
            
            <p className="text-steel text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-steel glass-subtle rounded-lg"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-steel">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            
            {/* Stats */}
            {project.stats && (
              <div className="flex items-center gap-4 text-xs text-steel">
                {project.stats.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{project.stats.views}</span>
                  </div>
                )}
                {project.stats.likes && (
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{project.stats.likes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* 3D Shadow Effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl opacity-20"
          style={{
            background: `linear-gradient(135deg, ${project.color})`,
            transform: "translateZ(-20px) scale(0.95)",
            filter: "blur(20px)"
          }}
          animate={{
            scale: isHovered ? 1 : 0.95,
            opacity: isHovered ? 0.3 : 0.1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}