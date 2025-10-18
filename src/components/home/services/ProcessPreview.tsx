"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, CheckCircle, MessageCircle } from "lucide-react";

interface ProcessPreviewProps {
  isAgencyMode: boolean;
}

export default function ProcessPreview({ isAgencyMode }: ProcessPreviewProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: MessageCircle,
      title: "Discovery",
      description: "Understanding your needs, goals, and vision",
      color: "from-coral to-sunset"
    },
    {
      icon: Search,
      title: "Research",
      description: "Market analysis and competitive research",
      color: "from-sunset to-purple"
    },
    {
      icon: PenTool,
      title: "Design",
      description: "Creating beautiful, user-centered designs",
      color: "from-purple to-mint"
    },
    {
      icon: Code2,
      title: "Development",
      description: "Building robust, scalable solutions",
      color: "from-mint to-coral"
    },
    {
      icon: CheckCircle,
      title: "Testing",
      description: "Ensuring quality and performance",
      color: "from-coral to-purple"
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "Deploying and monitoring your project",
      color: "from-purple to-sunset"
    }
  ];

  return (
    <div className="glass rounded-3xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-cream mb-4">
          {isAgencyMode ? "Our Process" : "How I Work"}
        </h3>
        <p className="text-steel max-w-2xl mx-auto">
          {isAgencyMode 
            ? "A proven methodology that ensures project success"
            : "My streamlined process for delivering exceptional results"
          }
        </p>
      </div>

      {/* Process Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-steel/20">
          <motion.div
            className="h-full bg-gradient-to-r from-coral to-purple"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            
            return (
              <motion.div
                key={step.title}
                className="relative cursor-pointer"
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -5 }}
              >
                {/* Step Number */}
                <motion.div
                  className={`w-24 h-24 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all ${
                    isActive 
                      ? `bg-gradient-to-br ${step.color}` 
                      : "glass"
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-8 h-8 ${isActive ? "text-cream" : "text-steel"}`} />
                </motion.div>
                
                {/* Step Info */}
                <div className="text-center">
                  <h4 className={`font-display font-bold mb-1 ${
                    isActive ? "text-cream" : "text-steel"
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-steel line-clamp-2">
                    {step.description}
                  </p>
                </div>

                {/* Active Indicator */}
                {index === activeStep && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-coral rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}