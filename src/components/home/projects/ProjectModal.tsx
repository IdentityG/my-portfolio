"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ExternalLink, 
  Github, 
  Figma,
  Calendar,
  Clock,
  User,
  Code2,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Star
} from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  project: any;
  onClose: () => void;
  isAgencyMode: boolean;
}

export default function ProjectModal({ project, onClose, isAgencyMode }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass rounded-3xl custom-scrollbar"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass-strong flex items-center justify-center group hover:bg-coral/20 transition-colors z-10"
        >
          <X className="w-5 h-5 text-steel group-hover:text-coral transition-colors" />
        </button>

        {/* Hero Image */}
        <div className="relative h-96 bg-gradient-to-br from-coral/20 to-purple/20 rounded-t-3xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-display font-bold text-coral/20">
              {project.title.charAt(0)}
            </span>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          
          {/* Project Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-cream mb-2">
                  {project.title}
                </h1>
                {isAgencyMode && project.client && (
                  <p className="text-lg text-coral">{project.client}</p>
                )}
              </div>
              
              {/* Quick Links */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ExternalLink className="w-5 h-5 text-cream" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Github className="w-5 h-5 text-cream" />
                  </a>
                )}
                {project.figmaUrl && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Figma className="w-5 h-5 text-cream" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-subtle rounded-xl p-4">
              <Calendar className="w-5 h-5 text-coral mb-2" />
              <p className="text-xs text-steel mb-1">Year</p>
              <p className="font-semibold text-cream">{project.year}</p>
            </div>
            <div className="glass-subtle rounded-xl p-4">
              <Clock className="w-5 h-5 text-coral mb-2" />
              <p className="text-xs text-steel mb-1">Duration</p>
              <p className="font-semibold text-cream">{project.duration}</p>
            </div>
            <div className="glass-subtle rounded-xl p-4">
              <User className="w-5 h-5 text-coral mb-2" />
              <p className="text-xs text-steel mb-1">Role</p>
              <p className="font-semibold text-cream">{project.role}</p>
            </div>
            <div className="glass-subtle rounded-xl p-4">
              <Code2 className="w-5 h-5 text-coral mb-2" />
              <p className="text-xs text-steel mb-1">Category</p>
              <p className="font-semibold text-cream capitalize">{project.category}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4">Overview</h3>
            <p className="text-steel leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-subtle rounded-full text-sm font-medium text-cream"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature: string) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                  <span className="text-steel">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div className="glass-subtle rounded-2xl p-6">
              <Quote className="w-8 h-8 text-coral mb-4" />
              <p className="text-lg text-cream mb-4 italic">
                "{project.testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-cream">{project.testimonial.author}</p>
                <p className="text-sm text-steel">{project.testimonial.role}</p>
              </div>
            </div>
          )}

          {/* Stats */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-3xl font-bold text-gradient">{value as string}</div>
                  <div className="text-sm text-steel capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}