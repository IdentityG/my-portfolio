"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, Mail, Sparkles } from "lucide-react";

interface NewsletterFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubscribing: boolean;
  status: "idle" | "success" | "error";
}

export default function NewsletterForm({
  email,
  setEmail,
  onSubmit,
  isSubscribing,
  status
}: NewsletterFormProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-coral" />
        <h5 className="text-sm font-semibold text-cream">Newsletter</h5>
      </div>
      
      <form onSubmit={onSubmit} className="relative">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel z-10" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-28 py-3 glass-subtle rounded-xl border border-steel/20 bg-transparent text-cream placeholder-steel/50 focus:outline-none focus:border-coral transition-colors"
            required
          />
          
          <motion.button
            type="submit"
            disabled={isSubscribing}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-gradient-to-r from-coral to-purple text-cream text-sm font-medium disabled:opacity-50"
            whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
            whileTap={{ scale: isSubscribing ? 1 : 0.95 }}
          >
            {isSubscribing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 flex items-center gap-2 text-xs text-mint"
            >
              <CheckCircle className="w-3 h-3" />
              <span>Successfully subscribed!</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 flex items-center gap-2 text-xs text-red-400"
            >
              <AlertCircle className="w-3 h-3" />
              <span>Something went wrong. Try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <p className="text-xs text-steel">
        Get weekly updates on new projects and tech insights
      </p>
    </div>
  );
}