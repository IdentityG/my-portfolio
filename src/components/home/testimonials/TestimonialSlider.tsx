"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Quote,
  Star,
  MapPin,
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface TestimonialSliderProps {
  testimonials: any[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
  isAgencyMode: boolean;
}

export default function TestimonialSlider({
  testimonials,
  activeIndex,
  onIndexChange,
  isAutoPlaying,
  onAutoPlayToggle,
  isAgencyMode
}: TestimonialSliderProps) {
  const currentTestimonial = testimonials[activeIndex];

  const handlePrevious = () => {
    onIndexChange(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    onIndexChange((activeIndex + 1) % testimonials.length);
  };

  return (
    <div className="relative">
      {/* Main Testimonial Display */}
      <motion.div 
        className="glass rounded-3xl p-8 md:p-12 min-h-[400px]"
        layout
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Quote Icon */}
            <div className="flex justify-between items-start">
              <Quote className="w-12 h-12 text-coral/20" />
              
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating 
                          ? "text-coral fill-coral" 
                          : "text-steel/30"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="relative">
              <motion.p 
                className="text-xl md:text-2xl text-cream leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                "{currentTestimonial.text}"
              </motion.p>
              
              {currentTestimonial.highlight && (
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <CheckCircle className="w-4 h-4 text-mint" />
                  <span className="text-sm font-semibold text-mint">
                    {currentTestimonial.highlight}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Author Info */}
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-steel/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-purple flex items-center justify-center">
                  <span className="text-2xl font-bold text-cream">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                
                {/* Name and Details */}
                <div>
                  <h4 className="text-lg font-semibold text-cream">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-steel">{currentTestimonial.role}</p>
                  {currentTestimonial.company && (
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-3 h-3 text-coral" />
                      <span className="text-sm text-coral">{currentTestimonial.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {currentTestimonial.location && (
                  <div className="flex items-center gap-1 text-sm text-steel">
                    <MapPin className="w-4 h-4" />
                    <span>{currentTestimonial.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-sm text-steel">
                  <Calendar className="w-4 h-4" />
                  <span>{currentTestimonial.date}</span>
                </div>
                {currentTestimonial.verified && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-mint" />
                    <span className="text-sm text-mint">Verified</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Project Tags */}
            {currentTestimonial.tags && (
              <motion.div 
                className="flex flex-wrap gap-2 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {currentTestimonial.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-steel glass-subtle rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className="relative w-2 h-2 rounded-full transition-all"
            >
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  index === activeIndex 
                    ? "bg-coral" 
                    : "bg-steel/30"
                }`}
                animate={{
                  scale: index === activeIndex ? 1 : 0.8,
                  width: index === activeIndex ? 24 : 8,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onAutoPlayToggle}
            className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 text-cream" />
            ) : (
              <Play className="w-4 h-4 text-cream" />
            )}
          </motion.button>
          
          <motion.button
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-cream" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 text-cream" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}