"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Heart, Star, Zap, Users, Award } from "lucide-react";

interface StatsCounterProps {
  isAgencyMode: boolean;
}

export default function StatsCounter({ isAgencyMode }: StatsCounterProps) {
  const personalStats = [
    { end: 75, label: "Projects", icon: TrendingUp, suffix: "+" },
    { end: 40, label: "Clients", icon: Heart, suffix: "+" },
    { end: 5, label: "Years", icon: Zap, suffix: "+" },
    { end: 95, label: "Rating", icon: Star, suffix: "%" }
  ];

  const agencyStats = [
    { end: 100, label: "Projects", icon: TrendingUp, suffix: "+" },
    { end: 50, label: "Clients", icon: Users, suffix: "+" },
    { end: 10, label: "Awards", icon: Award, suffix: "+" },
    { end: 98, label: "Success", icon: Star, suffix: "%" }
  ];

  const stats = isAgencyMode ? agencyStats : personalStats;

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const duration = 2000;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(stat.end * easeOutQuart));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(stat.end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stat.end, hasAnimated]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="relative group backdrop-blur-sm bg-midnight/30 rounded-2xl p-4 border border-coral/10 hover:border-coral/30 transition-colors overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -5 }}
    >
      {/* Hover Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-coral/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center"
          animate={{ rotate: hasAnimated ? 360 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Icon className="w-5 h-5 text-coral" />
        </motion.div>

        {/* Number */}
        <div className="text-3xl font-bold text-gradient text-center mb-1">
          {count}{stat.suffix}
        </div>

        {/* Label */}
        <div className="text-xs text-steel/60 text-center uppercase tracking-wider">
          {stat.label}
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(255, 107, 107, 0.1), transparent)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}