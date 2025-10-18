"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { 
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  Youtube,
  Facebook,
  ArrowUp,
  Heart,
  Coffee,
  Code2,
  Palette,
  Sparkles,
  Globe,
  Zap,
  Star,
  ChevronRight,
  ExternalLink,
  FileText,
  Shield,
  Award,
  Briefcase,
  Users,
  Rocket,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  BarChart,
  Activity
} from "lucide-react";
import NewsletterForm from "../home/footer/NewsletterForm";
import FooterLinks from "../home/footer/FooterLinks";
import SocialLinks from "../home/footer/SocialLinks";
import BackToTop from "../home/footer/BackToTop";

interface FooterProps {
  isAgencyMode?: boolean;
}

export default function Footer({ isAgencyMode = false }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");
  const [currentYear] = useState(new Date().getFullYear());
  const [visitorCount, setVisitorCount] = useState(12847);
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null);
  
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  // Animate visitor counter
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for decorative elements
      gsap.to(".footer-float", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribeStatus("success");
      setEmail("");
      
      setTimeout(() => {
        setSubscribeStatus("idle");
      }, 3000);
    }, 1500);
  };

  const footerLinks = {
    services: isAgencyMode ? [
      { label: "Web Development", href: "#services" },
      { label: "UI/UX Design", href: "#services" },
      { label: "Brand Identity", href: "#services" },
      { label: "Digital Marketing", href: "#services" },
      { label: "Consulting", href: "#services" }
    ] : [
      { label: "Frontend Development", href: "#services" },
      { label: "UI/UX Design", href: "#services" },
      { label: "Full Stack", href: "#services" },
      { label: "Mobile Apps", href: "#services" }
    ],
    company: isAgencyMode ? [
      { label: "About Us", href: "#about" },
      { label: "Our Team", href: "#team" },
      { label: "Case Studies", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" }
    ] : [
      { label: "About Me", href: "#about" },
      { label: "Portfolio", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" }
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Free Resources", href: "/resources" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Documentation", href: "/docs" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:text-gray-400" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-400" },
    { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com", color: "hover:text-pink-500" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "hover:text-red-500" }
  ];

  const stats = [
    { icon: Briefcase, value: "100+", label: "Projects" },
    { icon: Users, value: "50+", label: "Clients" },
    { icon: Star, value: "5.0", label: "Rating" },
    { icon: Coffee, value: "∞", label: "Coffee" }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-ink via-midnight to-ink border-t border-steel/10"
    >
      {/* Decorative Top Wave */}
      <div className="absolute -top-1 left-0 right-0">
        <svg 
          viewBox="0 0 1440 60" 
          className="w-full h-12 fill-coral/5"
        >
          <path d="M0,20 C360,60 720,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Main Footer Content */}
      <motion.div 
        className="container mx-auto px-6 lg:px-12 pt-20 pb-8"
        style={{ opacity, y }}
      >
        {/* Top Section - CTA */}
        <motion.div 
          className="footer-element glass-subtle rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 grid-pattern" />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 footer-float">
            <Sparkles className="w-8 h-8 text-coral/20" />
          </div>
          <div className="absolute bottom-8 left-8 footer-float">
            <Zap className="w-6 h-6 text-mint/20" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
                {isAgencyMode 
                  ? "Let's Build Something Amazing Together" 
                  : "Ready to Start Your Next Project?"}
              </h3>
              <p className="text-lg text-steel mb-6">
                {isAgencyMode
                  ? "Transform your ideas into digital reality with our expert team"
                  : "I'm always excited to work on new and challenging projects"
                }
              </p>
              
              {/* Quick Stats */}
              <div className="flex gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <stat.icon className="w-5 h-5 text-coral mx-auto mb-1" />
                    <div className="text-xl font-bold text-cream">{stat.value}</div>
                    <div className="text-xs text-steel">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 overflow-hidden rounded-full inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple" />
                <span className="relative flex items-center gap-2 text-cream font-semibold">
                  Start Project
                  <ArrowUp className="w-5 h-5 rotate-45" />
                </span>
              </motion.a>
              
              <motion.a
                href="#projects"
                className="px-8 py-4 rounded-full glass border border-coral/30 text-cream font-semibold inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Middle Section - Links & Newsletter */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Brand Section */}
          <motion.div className="footer-element lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-purple p-[2px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-xl bg-ink flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-gradient">EG</span>
                </div>
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-cream">
                  {isAgencyMode ? "EG Creative Studio" : "Egnuma Gelana"}
                </h4>
                <p className="text-xs text-steel">
                  {isAgencyMode ? "Digital Design Agency" : "Frontend Developer & Designer"}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-steel text-sm leading-relaxed">
              {isAgencyMode
                ? "We're a creative studio specializing in web development, design, and digital solutions that drive results."
                : "Passionate about creating beautiful, functional digital experiences that make a difference."
              }
            </p>

            {/* Newsletter */}
            <NewsletterForm
              email={email}
              setEmail={setEmail}
              onSubmit={handleSubscribe}
              isSubscribing={isSubscribing}
              status={subscribeStatus}
            />

            {/* Social Links */}
            <SocialLinks links={socialLinks} />
          </motion.div>

          {/* Links Sections */}
          <motion.div className="footer-element">
            <FooterLinks
              title={isAgencyMode ? "Services" : "Work"}
              links={footerLinks.services}
              activeLink={activeFooterLink}
              setActiveLink={setActiveFooterLink}
            />
          </motion.div>

          <motion.div className="footer-element">
            <FooterLinks
              title={isAgencyMode ? "Company" : "Quick Links"}
              links={footerLinks.company}
              activeLink={activeFooterLink}
              setActiveLink={setActiveFooterLink}
            />
          </motion.div>

          <motion.div className="footer-element">
            <FooterLinks
              title="Resources"
              links={footerLinks.resources}
              activeLink={activeFooterLink}
              setActiveLink={setActiveFooterLink}
              showNew={true}
            />
          </motion.div>
        </div>

        {/* Achievements Bar */}
        <motion.div 
          className="footer-element glass-subtle rounded-2xl p-6 mb-12"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              {[
                { icon: Award, text: "Award Winner 2024" },
                { icon: Shield, text: "Verified Developer" },
                { icon: CheckCircle, text: "Top Rated" },
                { icon: TrendingUp, text: "Fast Delivery" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4 text-coral" />
                  <span className="text-xs text-steel hidden sm:inline">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Live Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mint rounded-full animate-pulse" />
                <span className="text-xs text-steel">
                  <span className="text-cream font-semibold">{visitorCount.toLocaleString()}</span> visitors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-mint" />
                <span className="text-xs text-mint">Online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="footer-element border-t border-steel/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div 
              className="flex items-center gap-2 text-sm text-steel"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span>© {currentYear}</span>
              <span className="text-cream font-medium">
                {isAgencyMode ? "EG Creative Studio" : "Egnuma Gelana"}
              </span>
              <span>All rights reserved</span>
            </motion.div>

            {/* Center Text */}
            <motion.div 
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-steel">Crafted with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-coral fill-coral" />
              </motion.div>
              <span className="text-steel">and</span>
              <Coffee className="w-4 h-4 text-mint" />
              <span className="text-steel">in Ethiopia</span>
            </motion.div>

            {/* Legal Links */}
            <motion.div 
              className="flex items-center gap-4 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    className="text-steel hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-steel/30">•</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Language/Currency Selector (Optional) */}
        <motion.div 
          className="footer-element flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="flex items-center gap-2 px-4 py-2 glass-subtle rounded-lg text-sm text-steel hover:text-cream transition-colors">
            <Globe className="w-4 h-4" />
            <span>English</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 glass-subtle rounded-lg text-sm text-steel hover:text-cream transition-colors">
            <span>USD $</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-coral/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-mint/10 to-transparent rounded-full blur-3xl" />
    </footer>
  );
}