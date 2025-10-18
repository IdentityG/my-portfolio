"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function ContactMap() {
  return (
    <motion.div 
      className="glass-subtle rounded-2xl p-6"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-display font-bold text-cream">
          Location
        </h3>
        <Navigation className="w-5 h-5 text-coral" />
      </div>
      
      {/* Map Placeholder */}
      <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-coral/10 to-purple/10">
        {/* You can integrate actual map here (Google Maps, Mapbox, etc.) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-coral mx-auto mb-2" />
            <p className="text-sm text-steel">Available Worldwide</p>
            <p className="text-xs text-steel/70 mt-1">Remote First</p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-coral/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-mint/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-purple/30 rounded-full animate-pulse" />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          <p className="text-cream">Time Zone</p>
          <p className="text-steel">UTC +3:00</p>
        </div>
        <motion.button
          className="px-4 py-2 glass rounded-lg text-sm text-cream hover:text-coral transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View on Map
        </motion.button>
      </div>
    </motion.div>
  );
}