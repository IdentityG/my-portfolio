"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import SectionDivider from "@/components/home/about/SectionDivider";
import HeroSection from "@/components/home/HeroSection";


const LoadingScreen = dynamic(() => import("../components/common/LoadingScreen"), {
  ssr: false,
});

// Lazy load other sections for better performance
const AboutSection = dynamic(() => import("../components/home/AboutSection"), {
  loading: () => <SectionLoader />,
});

const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), {
  loading: () => <SectionLoader />,
});
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"), {
  loading: () => <SectionLoader />,
});

const ContactSection = dynamic(() => import("@/components/home/ContactSection"), {
  loading: () => <SectionLoader />,
});

const ProjectsSection = dynamic(() => import("@/components/home/ProjectsSection"), {
  loading: () => <SectionLoader />,
});

// Section Loader Component
function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-coral to-purple rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAgencyMode, setIsAgencyMode] = useState(false);

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle loading
  useEffect(() => {
    // Check if all resources are loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);


  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
     <div className="relative">
     <section id="home">
      <HeroSection 
        isAgencyMode={isAgencyMode}
        setIsAgencyMode={setIsAgencyMode}
      />   
      </section>

      <SectionDivider variant="dots" />
      
      <section id="about">
      <AboutSection isAgencyMode={isAgencyMode} />
      </section>

      <SectionDivider variant="line" />

       <section id="services">
       <ServicesSection isAgencyMode={isAgencyMode} />
       </section>

       <SectionDivider variant="wave" />

       <section id="projects">
          <ProjectsSection isAgencyMode={isAgencyMode} />
       </section>

       <SectionDivider variant="line" />

       <section id="testimonials">
       <TestimonialsSection isAgencyMode={isAgencyMode} />
       </section>

       <SectionDivider variant="dots" />

       <section id="contact">
       <ContactSection isAgencyMode={isAgencyMode} />
       </section>


      {/* Add more sections here as needed */}
      {/* <SkillsSection isAgencyMode={isAgencyMode} /> */}
      {/* <SectionDivider variant="wave" /> */}
      {/* <ProjectsSection isAgencyMode={isAgencyMode} /> */}

    </div>
     </motion.main>
      )}
    </>
  );
}