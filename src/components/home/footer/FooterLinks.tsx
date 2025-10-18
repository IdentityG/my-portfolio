"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
  showNew?: boolean;
}

export default function FooterLinks({
  title,
  links,
  activeLink,
  setActiveLink,
  showNew = false
}: FooterLinksProps) {
  return (
    <div className="space-y-4">
      <h5 className="font-semibold text-cream">{title}</h5>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <a
              href={link.href}
              className="group flex items-center gap-2 text-sm text-steel hover:text-cream transition-colors"
              onMouseEnter={() => setActiveLink(link.label)}
              onMouseLeave={() => setActiveLink(null)}
            >
              <motion.div
                className="w-4 h-4 flex items-center justify-center"
                animate={{ opacity: activeLink === link.label ? 1 : 0 }}
              >
                <ChevronRight className="w-3 h-3 text-coral" />
              </motion.div>
              <span>{link.label}</span>
              {showNew && index === 0 && (
                <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-coral to-purple text-cream rounded-full">
                  New
                </span>
              )}
              {link.href.startsWith("http") && (
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}