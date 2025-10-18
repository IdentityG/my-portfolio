"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { 
  Code2, 
  Palette, 
  Smartphone,
  Globe,
  Layers,
  Zap,
  Database,
  Cloud,
  ShoppingCart,
  Search,
  BarChart,
  Lock,
  Figma,
  PenTool,
  Monitor,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Rocket,
  Star,
  TrendingUp,
  Package
} from "lucide-react";
import ServiceCard from "./services/ServiceCard";
import ServiceModal from "./services/ServiceModal";
import ProcessPreview from "./services/ProcessPreview";
import TechStackDisplay from "./services/TechStackDisplay";
import PricingPreview from "./services/PricingPreview";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  startingPrice?: string;
}

interface ServicesSectionProps {
  isAgencyMode?: boolean;
}

export default function ServicesSection({ isAgencyMode = false }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "development" | "design" | "marketing">("all");
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const personalServices: Service[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Modern, responsive web applications with cutting-edge technologies",
      icon: Code2,
      color: "from-coral to-sunset",
      features: [
        "React/Next.js Development",
        "TypeScript Integration",
        "Responsive Design",
        "Performance Optimization",
        "SEO Implementation"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      deliverables: ["Source Code", "Documentation", "Deployment", "Training"],
      timeline: "2-8 weeks",
      startingPrice: "$2,000"
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "User-centered design solutions that delight and convert",
      icon: Palette,
      color: "from-purple to-coral",
      features: [
        "User Research",
        "Wireframing",
        "Visual Design",
        "Prototyping",
        "Design Systems"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Maze"],
      deliverables: ["Design Files", "Prototype", "Style Guide", "Assets"],
      timeline: "1-4 weeks",
      startingPrice: "$1,500"
    },
    {
      id: "fullstack",
      title: "Full Stack Development",
      description: "End-to-end web solutions from database to deployment",
      icon: Database,
      color: "from-mint to-purple",
      features: [
        "API Development",
        "Database Design",
        "Authentication",
        "Cloud Deployment",
        "CI/CD Setup"
      ],
      technologies: ["Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
      deliverables: ["Full Application", "API Documentation", "Deployment Guide"],
      timeline: "4-12 weeks",
      startingPrice: "$5,000"
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "Cross-platform mobile apps that perform like native",
      icon: Smartphone,
      color: "from-coral to-mint",
      features: [
        "React Native Apps",
        "iOS & Android",
        "Push Notifications",
        "Offline Support",
        "App Store Deployment"
      ],
      technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
      deliverables: ["Mobile App", "Store Listings", "Analytics Setup"],
      timeline: "6-16 weeks",
      startingPrice: "$8,000"
    }
  ];

  const agencyServices: Service[] = [
    {
      id: "webdev",
      title: "Web Development",
      description: "Custom websites that drive results and exceed expectations",
      icon: Globe,
      color: "from-coral to-sunset",
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "CMS Integration",
        "API Development",
        "Performance Optimization"
      ],
      technologies: ["Next.js", "React", "Node.js", "WordPress", "Shopify"],
      deliverables: ["Complete Website", "Admin Panel", "Documentation", "Training"],
      timeline: "4-12 weeks",
      startingPrice: "$5,000"
    },
    {
      id: "branding",
      title: "Brand Identity",
      description: "Complete brand packages that tell your unique story",
      icon: PenTool,
      color: "from-purple to-coral",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Marketing Materials",
        "Social Media Kit",
        "Packaging Design"
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch"],
      deliverables: ["Logo Files", "Brand Book", "Marketing Templates"],
      timeline: "2-6 weeks",
      startingPrice: "$3,000"
    },
    {
      id: "ecommerce",
      title: "E-commerce Solutions",
      description: "Online stores that convert visitors into customers",
      icon: ShoppingCart,
      color: "from-mint to-purple",
      features: [
        "Custom Store Design",
        "Payment Integration",
        "Inventory Management",
        "Order Processing",
        "Analytics Dashboard"
      ],
      technologies: ["Shopify", "WooCommerce", "Stripe", "Next.js"],
      deliverables: ["E-commerce Platform", "Admin Dashboard", "Training"],
      timeline: "6-10 weeks",
      startingPrice: "$8,000"
    },
    {
      id: "seo",
      title: "SEO & Marketing",
      description: "Data-driven strategies to boost your online presence",
      icon: Search,
      color: "from-coral to-mint",
      features: [
        "SEO Optimization",
        "Content Strategy",
        "Social Media Marketing",
        "PPC Campaigns",
        "Analytics & Reporting"
      ],
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Meta Ads"],
      deliverables: ["SEO Report", "Content Calendar", "Campaign Setup"],
      timeline: "Ongoing",
      startingPrice: "$2,000/month"
    },
    {
      id: "consulting",
      title: "Tech Consulting",
      description: "Strategic guidance for your digital transformation",
      icon: BarChart,
      color: "from-sunset to-purple",
      features: [
        "Tech Stack Audit",
        "Architecture Planning",
        "Performance Review",
        "Security Assessment",
        "Growth Strategy"
      ],
      technologies: ["Various based on needs"],
      deliverables: ["Consultation Report", "Action Plan", "Recommendations"],
      timeline: "1-2 weeks",
      startingPrice: "$1,500"
    },
    {
      id: "maintenance",
      title: "Maintenance & Support",
      description: "Keep your digital assets running smoothly 24/7",
      icon: Lock,
      color: "from-mint to-coral",
      features: [
        "Regular Updates",
        "Security Patches",
        "Performance Monitoring",
        "Backup Management",
        "24/7 Support"
      ],
      technologies: ["Monitoring Tools", "CI/CD", "Cloud Services"],
      deliverables: ["Monthly Reports", "Update Logs", "Support Tickets"],
      timeline: "Ongoing",
      startingPrice: "$500/month"
    }
  ];

  const services = isAgencyMode ? agencyServices : personalServices;
  
  // Filter services by category
  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => {
        if (activeCategory === "development") return ["frontend", "fullstack", "mobile", "webdev", "ecommerce"].includes(service.id);
        if (activeCategory === "design") return ["uiux", "branding"].includes(service.id);
        if (activeCategory === "marketing") return ["seo", "consulting", "maintenance"].includes(service.id);
        return true;
      });

  // GSAP Animations
  useEffect(() => {
    if (isInView && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".service-card"),
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8,
          rotationY: -30
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }
  }, [isInView, filteredServices]);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          {/* Animated Mesh Gradient */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-coral/20 via-purple/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-mint/20 via-coral/20 to-transparent rounded-full blur-3xl" />
          </motion.div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-coral/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div 
          className="container mx-auto px-6 lg:px-12"
          style={{ opacity }}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
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
                {isAgencyMode ? "Our Services" : "What I Offer"}
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="block text-gradient">
                {isAgencyMode ? "Solutions That Scale" : "Services & Expertise"}
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-steel max-w-3xl mx-auto">
              {isAgencyMode 
                ? "Comprehensive digital solutions tailored to your business needs, delivered with excellence and innovation"
                : "Bringing your ideas to life with modern technologies and creative design solutions"
              }
            </p>
          </motion.div>

          {/* Category Filter */}
          {isAgencyMode && (
            <motion.div 
              className="flex justify-center gap-2 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {["all", "development", "design", "marketing"].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category as any)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-coral to-purple text-cream"
                      : "glass text-steel hover:text-cream"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="capitalize font-medium">{category}</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Services Grid */}
          <div 
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isHovered={hoveredService === service.id}
                  onHover={setHoveredService}
                  onClick={() => setSelectedService(service)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Process Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ProcessPreview isAgencyMode={isAgencyMode} />
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <TechStackDisplay isAgencyMode={isAgencyMode} />
          </motion.div>

          {/* Pricing Preview */}
          {isAgencyMode && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <PricingPreview />
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
                {isAgencyMode ? "Ready to Transform Your Business?" : "Let's Build Something Amazing"}
              </h3>
              <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
                {isAgencyMode 
                  ? "Get a free consultation and discover how we can help you achieve your digital goals"
                  : "Have a project in mind? Let's discuss how I can help bring your vision to life"
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="group relative px-8 py-4 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-coral to-purple"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2 text-cream font-semibold">
                    {isAgencyMode ? "Get Free Quote" : "Start Project"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 rounded-full glass border border-coral/30 text-cream font-semibold hover:bg-coral/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[
                  { icon: Clock, label: "Fast Delivery", value: "On Time" },
                  { icon: Users, label: "Happy Clients", value: "50+" },
                  { icon: Star, label: "Rating", value: "5.0" },
                  { icon: Rocket, label: "Projects", value: "100+" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <stat.icon className="w-8 h-8 text-coral mx-auto mb-2" />
                    <div className="text-xl font-bold text-cream">{stat.value}</div>
                    <div className="text-sm text-steel">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)}
            isAgencyMode={isAgencyMode}
          />
        )}
      </AnimatePresence>
    </>
  );
}