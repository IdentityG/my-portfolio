"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterHeadlineProps {
  phrases: string[];
}

export default function TypewriterHeadline({ phrases }: TypewriterHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, phrases]);

  return (
    <div className="min-h-[80px] flex items-center justify-center">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
        <span className="text-gradient relative inline-flex items-baseline">
          {displayText}
          <motion.span
            className="inline-block w-0.5 h-8 md:h-10 lg:h-12 bg-coral ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </span>
      </h2>
    </div>
  );
}