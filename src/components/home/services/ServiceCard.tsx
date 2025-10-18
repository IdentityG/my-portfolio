"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Package } from "lucide-react";

interface ServiceCardProps {
  service: any;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

export default function ServiceCard({ 
  service, 
  index, 
  isHovered, 
  onHover, 
  onClick 
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      layout
      className="service-card relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <motion.div
        className="glass rounded-2xl p-6 h-full cursor-pointer group"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
        />
        
        {/* Icon Container */}
        <motion.div
          className="relative mb-4"
          animate={isHovered ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-cream" />
          </div>
          
          {/* Floating Badge */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-mint rounded-full flex items-center justify-center"
            animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : {}}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-3 h-3 text-ink" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-display font-bold text-cream mb-2 group-hover:text-gradient transition-all">
          {service.title}
        </h3>
        
        <p className="text-steel text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Features Preview */}
        <div className="space-y-2 mb-4">
          {service.features.slice(0, 3).map((feature: string, idx: number) => (
            <motion.div
              key={feature}
              className="flex items-center gap-2 text-sm text-steel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
            >
              <div className="w-1.5 h-1.5 bg-coral rounded-full" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-steel/20">
          {service.startingPrice && (
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-coral" />
              <span className="text-sm font-semibold text-cream">
                {service.startingPrice}
              </span>
            </div>
          )}
          
          <motion.div
            className="flex items-center gap-1 text-coral font-medium text-sm"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Hover Effect - Corner Decoration */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ rotate: 0 }}
          animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M 100 0 Q 100 50 50 50 T 0 100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#7209B7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}