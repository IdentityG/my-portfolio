"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, Building2, ArrowUpRight } from "lucide-react";

interface TestimonialCardProps {
  testimonial: any;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  isCompact?: boolean;
}

export default function TestimonialCard({
  testimonial,
  index,
  isHovered,
  onHover,
  isCompact = false
}: TestimonialCardProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => onHover(testimonial.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="glass-subtle rounded-2xl p-6 h-full cursor-pointer"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Quote className="w-8 h-8 text-coral/20" />
          
          {/* Rating */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating 
                    ? "text-coral fill-coral" 
                    : "text-steel/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <p className={`text-steel mb-4 ${isCompact ? "line-clamp-3" : ""}`}>
          "{testimonial.text}"
        </p>

        {/* Highlight */}
        {testimonial.highlight && !isCompact && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle mb-4">
            <CheckCircle className="w-3 h-3 text-mint" />
            <span className="text-xs font-semibold text-mint">
              {testimonial.highlight}
            </span>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center justify-between pt-4 border-t border-steel/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-purple flex items-center justify-center">
              <span className="text-sm font-bold text-cream">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-cream">
                {testimonial.name}
              </h4>
              <p className="text-xs text-steel">{testimonial.role}</p>
            </div>
          </div>

          {/* Hover Action */}
          <motion.div
            className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center opacity-0 group-hover:opacity-100"
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 text-cream" />
          </motion.div>
        </div>

        {/* Company Badge */}
        {testimonial.company && (
          <motion.div 
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <Building2 className="w-3 h-3 text-coral" />
            <span className="text-xs text-coral">{testimonial.company}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}