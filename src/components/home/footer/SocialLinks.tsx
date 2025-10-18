"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialLinksProps {
  links: Array<{
    name: string;
    icon: any;
    href: string;
    color: string;
  }>;
}

export default function SocialLinks({ links }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-semibold text-cream">Connect</h5>
      <div className="flex gap-3">
        {links.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative w-10 h-10 rounded-lg glass-subtle flex items-center justify-center group ${social.color}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, type: "spring" }}
              whileHover={{ scale: 1.1, y: -5 }}
              onHoverStart={() => setHoveredSocial(social.name)}
              onHoverEnd={() => setHoveredSocial(null)}
            >
              <Icon className="w-5 h-5 text-steel group-hover:text-cream transition-colors" />
              
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredSocial === social.name && (
                  <motion.div
                    className="absolute -top-8 px-2 py-1 glass-strong rounded text-xs text-cream whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {social.name}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${
                    social.name === "GitHub" ? "rgba(156, 163, 175, 0.2)" :
                    social.name === "LinkedIn" ? "rgba(59, 130, 246, 0.2)" :
                    social.name === "Twitter" ? "rgba(56, 189, 248, 0.2)" :
                    social.name === "Instagram" ? "rgba(236, 72, 153, 0.2)" :
                    social.name === "Dribbble" ? "rgba(236, 72, 153, 0.2)" :
                    "rgba(239, 68, 68, 0.2)"
                  } 0%, transparent 70%)`
                }}
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}