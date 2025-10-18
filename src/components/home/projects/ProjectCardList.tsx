"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Clock, ArrowUpRight } from "lucide-react";

interface ProjectCardListProps {
  project: any;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  isAgencyMode: boolean;
}

export default function ProjectCardList({ 
  project, 
  index, 
  isHovered, 
  onHover, 
  onClick,
  isAgencyMode 
}: ProjectCardListProps) {
  return (
    <motion.div
      className="project-card group cursor-pointer"
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className="glass-subtle rounded-2xl p-6 hover:glass transition-all">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="lg:w-1/3">
            <div className="aspect-video lg:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl font-display font-bold text-coral/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-cream mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                {isAgencyMode && project.client && (
                  <p className="text-sm text-coral mb-2">{project.client}</p>
                )}
                <p className="text-steel mb-4">
                  {project.description}
                </p>
              </div>
              
              {/* Action Button */}
              <motion.div
                className="w-12 h-12 rounded-full glass-strong flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 45 }}
              >
                <ArrowUpRight className="w-5 h-5 text-cream" />
              </motion.div>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-steel">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-steel">
                <Clock className="w-4 h-4" />
                <span>{project.duration}</span>
              </div>
            </div>
            
            {/* Tags and Links */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-steel glass-subtle rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center hover:glass transition-all"
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
                    className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center hover:glass transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4 text-cream" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}