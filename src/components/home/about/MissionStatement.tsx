"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Zap } from "lucide-react";

interface MissionStatementProps {
  isAgencyMode: boolean;
}

export default function MissionStatement({ isAgencyMode }: MissionStatementProps) {
  const statements = isAgencyMode ? [
    {
      icon: Target,
      title: "Our Mission",
      content: "To empower businesses with digital solutions that drive growth, inspire audiences, and create lasting impact in the digital landscape."
    },
    {
      icon: Eye,
      title: "Our Vision",
      content: "To be the leading creative studio known for transforming ideas into extraordinary digital experiences that set new industry standards."
    },
    {
      icon: Heart,
      title: "Our Promise",
      content: "Excellence in every pixel and line of code, ensuring your investment translates into measurable success and exceptional user experiences."
    }
  ] : [
    {
      icon: Target,
      title: "My Mission",
      content: "To craft digital experiences that meet technical requirements while inspiring, engaging, and leaving lasting impressions on users."
    },
    {
      icon: Eye,
      title: "My Vision",
      content: "To continuously push web development boundaries, creating innovative solutions that shape the future of digital interaction."
    },
    {
      icon: Zap,
      title: "My Approach",
      content: "Combining creative design thinking with robust development practices to deliver beautiful, functional, and performant solutions."
    }
  ];

  return (
    <div className="space-y-4">
      {statements.map((statement, index) => {
        const Icon = statement.icon;
        return (
          <motion.div
            key={statement.title}
            className="relative group backdrop-blur-sm bg-midnight/40 rounded-2xl p-6 border border-coral/10 hover:border-coral/20 transition-colors overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ x: 5, scale: 1.01 }}
          >
            {/* Hover Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-coral/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="flex gap-5 relative z-10">
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-7 h-7 text-coral" />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl font-display font-bold text-cream mb-2">
                  {statement.title}
                </h4>
                <p className="text-steel/90 leading-relaxed">
                  {statement.content}
                </p>
              </div>
            </div>

            {/* Decorative Corner */}
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-coral/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        );
      })}
    </div>
  );
}