"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Clock, Package, Star, ArrowRight, Zap } from "lucide-react";

interface ServiceModalProps {
  service: any;
  onClose: () => void;
  isAgencyMode: boolean;
}

export default function ServiceModal({ service, onClose, isAgencyMode }: ServiceModalProps) {
  const Icon = service.icon;

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

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center group hover:bg-coral/20 transition-colors z-10"
        >
          <X className="w-5 h-5 text-steel group-hover:text-coral transition-colors" />
        </button>

        {/* Header */}
        <div className={`relative p-8 pb-6 bg-gradient-to-br ${service.color} rounded-t-3xl`}>
          <div className="flex items-start gap-6">
            <motion.div
              className="w-20 h-20 bg-cream/10 backdrop-blur rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="w-10 h-10 text-cream" />
            </motion.div>
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-cream mb-2">
                {service.title}
              </h2>
              <p className="text-cream/80 text-lg">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-cream/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{service.timeline}</span>
                </div>
                {service.startingPrice && (
                  <div className="flex items-center gap-2 text-cream/70">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">From {service.startingPrice}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-cream/70">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Features */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-coral" />
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature: string, index: number) => (
                <motion.div
                  key={feature}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                  <span className="text-steel">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech: string, index: number) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 glass rounded-lg text-sm font-medium text-cream"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-2xl font-display font-bold text-cream mb-4">
              What You'll Get
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.deliverables.map((deliverable: string, index: number) => (
                <motion.div
                  key={deliverable}
                  className="glass rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-coral" />
                    </div>
                    <span className="font-medium text-cream">{deliverable}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-steel/20">
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="flex-1 group relative px-6 py-3 overflow-hidden rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple" />
                <span className="relative flex items-center justify-center gap-2 text-cream font-semibold">
                  {isAgencyMode ? "Get Started" : "Hire Me"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
              
              <motion.button
                className="flex-1 px-6 py-3 rounded-full glass border border-coral/30 text-cream font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}