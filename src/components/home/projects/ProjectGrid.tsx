"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectCardMinimal from "./ProjectCardMinimal";
import ProjectCardList from "./ProjectCardList"

interface ProjectGridProps {
  projects: any[];
  viewMode: "grid" | "list" | "minimal";
  onProjectClick: (project: any) => void;
  hoveredProject: string | null;
  onProjectHover: (id: string | null) => void;
  isAgencyMode: boolean;
}

export default function ProjectGrid({
  projects,
  viewMode,
  onProjectClick,
  hoveredProject,
  onProjectHover,
  isAgencyMode
}: ProjectGridProps) {
  const gridClasses = {
    grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
    list: "space-y-6",
    minimal: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  };

  return (
    <motion.div 
      className={gridClasses[viewMode]}
      layout
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => {
          const Component = viewMode === "grid" 
            ? ProjectCard 
            : viewMode === "minimal" 
            ? ProjectCardMinimal 
            : ProjectCardList;

          return (
            <Component
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={onProjectHover}
              onClick={() => onProjectClick(project)}
              isAgencyMode={isAgencyMode}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}