"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Globe, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

interface ProfileCardProps {
  isAgencyMode: boolean;
}

export default function ProfileCard({ isAgencyMode }: ProfileCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-[#333]" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-[#0077B5]" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[#1DA1F2]" },
    { icon: Globe, href: "#", label: "Website", color: "hover:text-mint" }
  ];

  return (
    <motion.div
      className="relative group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Card */}
      <div className="relative backdrop-blur-sm bg-midnight/40 rounded-3xl p-8 border border-coral/10 overflow-hidden">
        {/* Hover Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-coral/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="relative z-10">
          {/* Avatar */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {!isAgencyMode ? (
              <div className="relative w-32 h-32 mx-auto">
                {/* Rotating Border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(45deg, #FF6B6B, #F72585, #7209B7, #4ECDC4)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Circle */}
                <div className="absolute inset-1 bg-ink rounded-full overflow-hidden">
                  {/* Placeholder - Replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-gradient">EG</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <motion.div
                  className="absolute bottom-2 right-2 w-6 h-6 bg-mint rounded-full border-2 border-ink flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-ink rounded-full" />
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="relative w-40 h-24 mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <motion.div
                    className="text-5xl font-display font-bold text-gradient mb-2"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    EG
                  </motion.div>
                  <span className="text-xs uppercase tracking-widest text-steel">Creative Studio</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-bold text-center text-cream mb-1">
              {isAgencyMode ? "EG Creative Studio" : "Egnuma Gelana"}
            </h3>

            <p className="text-center text-coral font-medium mb-6">
              {isAgencyMode ? "Digital Design Agency" : "Frontend Developer & Designer"}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: MapPin, text: "Worldwide", href: "#" },
                { icon: Mail, text: "hello@eg.com", href: "mailto:hello@eg.com" },
                { icon: ExternalLink, text: "Available for Projects", href: "#" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-steel/80 hover:text-cream transition-colors group/item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center group-hover/item:bg-coral/20 transition-colors">
                    <item.icon className="w-4 h-4 text-coral" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-2">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 rounded-xl backdrop-blur-sm bg-midnight/30 border border-coral/10 flex items-center justify-center group/social hover:border-coral/30 transition-colors"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <Icon className="`{w-4 h-4 text-steel/60 group-hover/social:text-coral transition-colors ${link.color}`}" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Decorative Glow */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-coral/20 via-purple/20 to-mint/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      />
    </motion.div>
  );
}