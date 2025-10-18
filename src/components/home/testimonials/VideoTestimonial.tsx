"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";

interface VideoTestimonialProps {
  videoUrl: string;
  thumbnail?: string;
  name: string;
  role: string;
  company?: string;
}

export default function VideoTestimonial({
  videoUrl,
  thumbnail,
  name,
  role,
  company
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="relative">
      {/* Video Thumbnail/Player */}
      <div className="relative aspect-video rounded-2xl overflow-hidden glass-subtle">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center">
              <motion.button
                className="w-20 h-20 rounded-full glass-strong flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
              >
                <Play className="w-8 h-8 text-cream ml-1" />
              </motion.button>
            </div>
            
            {/* Author Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink via-ink/80 to-transparent">
              <h4 className="text-lg font-semibold text-cream">{name}</h4>
              <p className="text-sm text-steel">{role}</p>
              {company && (
                <p className="text-sm text-coral">{company}</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Video Player Placeholder */}
            <div className="absolute inset-0 bg-ink flex items-center justify-center">
              <span className="text-steel">Video Player</span>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 glass-strong">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-cream" />
                    ) : (
                      <Play className="w-4 h-4 text-cream" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-cream" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-cream" />
                    )}
                  </button>
                </div>
                
                <button
                  onClick={() => setIsPlaying(false)}
                  className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-cream" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}