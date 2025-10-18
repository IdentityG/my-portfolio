"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Building2,
  Briefcase,
  Code2,
  Palette,
  Rocket,
  Star,
  Zap,
  Heart,
  Coffee,
  ArrowUpRight,
  Navigation,
  AtSign,
  FileText
} from "lucide-react";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import ContactMap from "./contact/ContactMap";
import FAQSection from "./contact/FAQSection";
import ScheduleCall from "./contact/ScheduleCall";

interface ContactSectionProps {
  isAgencyMode?: boolean;
}

export default function ContactSection({ isAgencyMode = false }: ContactSectionProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "schedule">("message");
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // GSAP Animations
  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo(
        ".contact-element",
        { 
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }
      );

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2
      });
    }
  }, [isInView]);

  const services = isAgencyMode ? [
    { id: "web", label: "Web Development", icon: Code2 },
    { id: "design", label: "UI/UX Design", icon: Palette },
    { id: "branding", label: "Brand Identity", icon: Star },
    { id: "consulting", label: "Consulting", icon: Briefcase }
  ] : [
    { id: "frontend", label: "Frontend Dev", icon: Code2 },
    { id: "design", label: "Design", icon: Palette },
    { id: "fullstack", label: "Full Stack", icon: Rocket },
    { id: "other", label: "Other", icon: Zap }
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" }
  ];

  const handleFormSubmit = async (data: any) => {
    setIsFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsFormSubmitting(false);
      setFormStatus("success");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
          style={{ y }}
        >
          <div className="w-full h-full bg-gradient-to-br from-coral/10 via-purple/5 to-transparent rounded-full blur-3xl" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px]"
          style={{ y: useTransform(y, v => v * -0.5) }}
        >
          <div className="w-full h-full bg-gradient-to-br from-mint/10 via-coral/5 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="float-element absolute"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
            >
              <div className="w-2 h-2 bg-coral/20 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="container mx-auto px-6 lg:px-12"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral uppercase tracking-wider">
              {isAgencyMode ? "Get In Touch" : "Let's Connect"}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="block text-gradient">
              {isAgencyMode ? "Start Your Project Today" : "Let's Work Together"}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-steel max-w-3xl mx-auto">
            {isAgencyMode 
              ? "Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary together."
              : "Have a project in mind? I'd love to hear about it. Let's create something amazing together."
            }
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactInfo isAgencyMode={isAgencyMode} />

            {/* Quick Stats */}
            <motion.div 
              className="glass-subtle rounded-2xl p-6 space-y-4"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-display font-bold text-cream mb-4">
                {isAgencyMode ? "Why Choose Us" : "Why Work With Me"}
              </h3>
              
              <div className="space-y-3">
                {[
                  { icon: Clock, text: "Quick Response Time", detail: "Within 24 hours" },
                  { icon: CheckCircle, text: "100% Success Rate", detail: "All projects delivered" },
                  { icon: Heart, text: "Client Satisfaction", detail: "5.0 star rating" },
                  { icon: Coffee, text: "Available for", detail: "Long-term projects" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cream">{item.text}</p>
                      <p className="text-xs text-steel">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="glass-subtle rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-display font-bold text-cream mb-4">
                Connect on Social
              </h3>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl glass-subtle flex items-center justify-center group ${social.color}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      onHoverStart={() => setHoveredSocial(social.name)}
                      onHoverEnd={() => setHoveredSocial(null)}
                    >
                      <Icon className="w-5 h-5 text-steel group-hover:text-cream transition-colors" />
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredSocial === social.name && (
                          <motion.div
                            className="absolute -top-10 px-2 py-1 glass-strong rounded text-xs text-cream whitespace-nowrap"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                          >
                            {social.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Map */}
            <ContactMap />
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div 
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8">
              <motion.button
                onClick={() => setActiveTab("message")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "message"
                    ? "glass-strong text-cream"
                    : "glass-subtle text-steel hover:text-cream"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("schedule")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "schedule"
                    ? "glass-strong text-cream"
                    : "glass-subtle text-steel hover:text-cream"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Call</span>
                </div>
              </motion.button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "message" ? (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactForm
                    services={services}
                    selectedService={selectedService}
                    onServiceChange={setSelectedService}
                    onSubmit={handleFormSubmit}
                    isSubmitting={isFormSubmitting}
                    status={formStatus}
                    isAgencyMode={isAgencyMode}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScheduleCall isAgencyMode={isAgencyMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FAQSection isAgencyMode={isAgencyMode} />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="glass-subtle rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
              {isAgencyMode 
                ? "Ready to Transform Your Business?" 
                : "Have a Question?"}
            </h3>
            <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
              {isAgencyMode 
                ? "Let's discuss how we can help you achieve your goals"
                : "Feel free to reach out anytime. I'm always happy to chat!"
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`mailto:hello@egnumagelana.com`}
                className="group relative px-8 py-4 overflow-hidden rounded-full inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple" />
                <span className="relative flex items-center gap-2 text-cream font-semibold">
                  <Mail className="w-5 h-5" />
                  hello@egnumagelana.com
                </span>
              </motion.a>
              
              <motion.a
                href="tel:+1234567890"
                className="px-8 py-4 rounded-full glass border border-coral/30 text-cream font-semibold inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
