"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { 
  Code2, 
  Palette, 
  Briefcase, 
  User, 
  Mail, 
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
  Download
} from "lucide-react";

const navItems = [
  { name: "About", href: "#about", icon: User },
  { name: "Services", href: "#services", icon: Palette },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Testimonials", href: "#testimonials", icon: Code2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Active section detection
      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic effect for logo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      
      const rect = magnetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 100) {
        mouseX.set(distanceX * 0.2);
        mouseY.set(distanceY * 0.2);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP animations for nav items
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.querySelectorAll(".nav-item"),
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, []);

  // Logo animation on mount
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div 
            className={`glass rounded-2xl px-6 lg:px-8 transition-all duration-500 ${
              isScrolled ? "py-3" : "py-4"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo with Magnetic Effect */}
              <Link href="/" className="relative z-10">
                <motion.div
                  ref={magnetRef}
                  style={{ x, y }}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    ref={logoRef}
                    className="relative flex items-center gap-3 group"
                  >
                    {/* Animated Logo Shape */}
                    <div className="relative w-12 h-12">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-coral to-purple rounded-xl"
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute inset-[2px] bg-ink rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="font-display font-bold text-xl text-gradient">
                          EG
                        </span>
                      </motion.div>
                      
                      {/* Sparkle Effect */}
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-mint" />
                      </motion.div>
                    </div>
                    
                    {/* Name */}
                    <div className="hidden sm:block">
                      <motion.h1 
                        className="font-display font-bold text-lg text-cream"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Egnuma Gelana
                      </motion.h1>
                      <motion.p 
                        className="text-xs text-steel uppercase tracking-wider"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        Creative Developer
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="nav-item relative"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <motion.div
                        className={`relative px-4 py-2 rounded-xl transition-colors duration-300 ${
                          isActive ? "text-coral" : "text-cream hover:text-coral"
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Hover Background */}
                        <AnimatePresence>
                          {hoveredIndex === index && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-coral/10 to-purple/10 rounded-xl"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-coral to-purple"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        <div className="relative flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
                
                {/* CTA Button */}
                <motion.div
                  className="ml-4 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="relative px-6 py-2.5 bg-gradient-to-r from-coral to-purple rounded-full flex items-center gap-2">
                      <Download className="w-4 h-4 text-cream" />
                      <span className="font-semibold text-sm text-cream">Resume</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-cream" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    className="absolute w-6 h-0.5 bg-cream rounded-full"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 0 : -8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute w-6 h-0.5 bg-cream rounded-full"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      x: isMenuOpen ? 20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute w-6 h-0.5 bg-cream rounded-full"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 0 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ink/95 backdrop-blur-xl z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="fixed inset-x-0 top-24 z-40 lg:hidden px-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-2xl p-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href;
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? "bg-gradient-to-r from-coral/20 to-purple/20 text-coral" 
                              : "hover:bg-midnight/50 text-cream"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-coral rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 border-t border-steel/20"
                  >
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-coral to-purple rounded-xl text-cream font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-mint to-purple z-50"
        style={{
          scaleX: useSpring(useMotionValue(0), {
            stiffness: 100,
            damping: 30,
          }),
          transformOrigin: "0%",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
      />
    </>
  );
}