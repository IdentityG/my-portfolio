"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import ProfileCard from "./about/ProfileCard";
import StatsCounter from "./about/StatsCounter";
import SkillsPreview from "./about/SkillsPreview";
import ExperienceTimeline from "./about/ExperienceTimeline";
import TabNavigation from "./about/TabNavigation";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  isAgencyMode?: boolean;
}

export default function AboutSection({ isAgencyMode = false }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "values">("story");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (isInView && headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { 
          opacity: 0,
          y: 50,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
      id="about"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle Gradient Orbs */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[120px]"
          style={{ y }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-mint/10 rounded-full blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 lg:px-12"
        style={{ opacity }}
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-midnight/30 border border-coral/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 107, 107, 0.3)" }}
          >
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral uppercase tracking-wider">
              {isAgencyMode ? "About Studio" : "About Me"}
            </span>
          </motion.div>
          
          <h2 
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          >
            <span className="text-gradient">
              {splitText(isAgencyMode ? "We Create Excellence" : "Crafting Experiences")}
            </span>
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-steel/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {isAgencyMode 
              ? "Transforming brands through innovative design and cutting-edge development"
              : "Creating memorable digital experiences that inspire and engage"
            }
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Left Column - Profile */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <ProfileCard isAgencyMode={isAgencyMode} />
              
              {/* Stats */}
              <div className="mt-8">
                <StatsCounter isAgencyMode={isAgencyMode} />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content Tabs */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TabNavigation 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAgencyMode={isAgencyMode}
            />
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SkillsPreview isAgencyMode={isAgencyMode} />
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ExperienceTimeline isAgencyMode={isAgencyMode} />
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="group relative px-10 py-5 overflow-hidden rounded-full inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-coral via-sunset to-purple"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple via-sunset to-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative text-cream font-semibold text-lg">
              {isAgencyMode ? "Start Your Project" : "Let's Work Together"}
            </span>
            <motion.div
              className="relative"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-cream" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}