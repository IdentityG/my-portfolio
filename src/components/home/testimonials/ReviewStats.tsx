"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Users, Award } from "lucide-react";

interface ReviewStatsProps {
  isAgencyMode: boolean;
}

export default function ReviewStats({ isAgencyMode }: ReviewStatsProps) {
  return (
    <motion.div
      className="mt-16 glass-subtle rounded-3xl p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Stats Summary */}
        <div>
          <h3 className="text-2xl font-display font-bold text-cream mb-6">
            {isAgencyMode ? "Client Satisfaction Metrics" : "Review Summary"}
          </h3>
          
          {/* Rating Bars */}
          <div className="space-y-3">
            {[
              { stars: 5, percentage: 85, count: 42 },
              { stars: 4, percentage: 10, count: 5 },
              { stars: 3, percentage: 3, count: 2 },
              { stars: 2, percentage: 1, count: 1 },
              { stars: 1, percentage: 1, count: 0 }
            ].map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-20">
                  <span className="text-sm text-steel">{rating.stars}</span>
                  <Star className="w-4 h-4 text-coral fill-coral" />
                </div>
                
                <div className="flex-1 h-2 bg-midnight/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-coral to-purple"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${rating.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: (5 - rating.stars) * 0.1 }}
                  />
                </div>
                
                <span className="text-sm text-steel w-12 text-right">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Rating */}
        <div className="text-center">
          <motion.div
            className="inline-flex flex-col items-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="text-6xl font-bold text-gradient mb-2">
              {isAgencyMode ? "5.0" : "4.9"}
            </div>
            
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-coral fill-coral" />
              ))}
            </div>
            
            <p className="text-steel">
              Based on <span className="text-cream font-semibold">50+</span> reviews
            </p>
            
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <Users className="w-5 h-5 text-coral mx-auto mb-1" />
                <div className="text-xl font-bold text-cream">98%</div>
                <div className="text-xs text-steel">Would Recommend</div>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-5 h-5 text-mint mx-auto mb-1" />
                <div className="text-xl font-bold text-cream">100%</div>
                <div className="text-xs text-steel">Satisfaction</div>
              </div>
              
              <div className="text-center">
                <Award className="w-5 h-5 text-purple mx-auto mb-1" />
                <div className="text-xl font-bold text-cream">A+</div>
                <div className="text-xs text-steel">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}