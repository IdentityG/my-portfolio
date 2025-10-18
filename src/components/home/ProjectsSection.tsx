"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ExternalLink,
  Github,
  Figma,
  Play,
  ArrowUpRight,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Folder,
  Calendar,
  Award,
  TrendingUp,
  Code2,
  Palette,
  Globe,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  LayoutGrid,
  Square
} from "lucide-react";
import Image from "next/image";
import ProjectCard from "./projects/ProjectCard";
import ProjectModal from "./projects/ProjectModal";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectGrid from "./projects/ProjectGrid";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  images?: string[];
  video?: string;
  client?: string;
  year: string;
  duration: string;
  role: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  stats?: {
    views?: string;
    likes?: string;
    performance?: string;
  };
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  color: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  isAgencyMode?: boolean;
}

export default function ProjectsSection({ isAgencyMode = false }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "minimal">("grid");
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const personalProjects: Project[] = [
    {
      id: "portfolio-v3",
      title: "Mekiya Coffee",
      description: "Award-winning personal portfolio with advanced animations and interactions",
      category: "web",
      tags: ["Next.js", "GSAP", "Three.js", "Tailwind CSS", "Framer Motion"],
      image: "/projects/coffee.png",
      images: ["/projects/coffee.png", "/projects/coffee.png"],
      year: "2025",
      duration: "3 weeks",
      role: "Full Stack Developer",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      features: [
        "3D animations and interactions",
        "Dark/Light mode with smooth transitions",
        "Performance score 100/100",
        "SEO optimized"
      ],
      liveUrl: "https://mekiyacoffee.com",
      githubUrl: "https://github.com/example",
      stats: {
        views: "10K+",
        likes: "500+",
        performance: "100/100"
      },
      color: "from-coral to-purple",
      featured: true
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with AI-powered recommendations",
      category: "web",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/projects/ecommerce.jpg",
      year: "2024",
      duration: "8 weeks",
      role: "Frontend Lead",
      technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe"],
      features: [
        "AI product recommendations",
        "Real-time inventory",
        "Secure payment processing",
        "Admin dashboard"
      ],
      liveUrl: "https://shop.example.com",
      color: "from-mint to-coral",
      featured: true
    },
    {
      id: "mobile-banking",
      title: "Banking App UI",
      description: "Minimalist mobile banking interface with biometric authentication",
      category: "mobile",
      tags: ["React Native", "Firebase"],
      image: "/projects/banking.jpg",
      year: "2023",
      duration: "6 weeks",
      role: "UI/UX Designer & Developer",
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      features: [
        "Biometric authentication",
        "Real-time transactions",
        "Bill payments",
        "Investment tracking"
      ],
      color: "from-purple to-sunset",
      featured: false
    },
    {
      id: "design-system",
      title: "Cosmic Design System",
      description: "Comprehensive design system with 50+ components",
      category: "design",
      tags: ["Figma", "Storybook"],
      image: "/projects/design-system.jpg",
      year: "2023",
      duration: "4 weeks",
      role: "Design System Architect",
      technologies: ["Figma", "Storybook", "React", "TypeScript"],
      features: [
        "50+ components",
        "Auto-layout system",
        "Dark/Light themes",
        "Accessibility focused"
      ],
      figmaUrl: "https://figma.com/example",
      color: "from-sunset to-coral",
      featured: false
    }
  ];

  const agencyProjects: Project[] = [
    {
      id: "tech-startup",
      title: "TechFlow SaaS",
      description: "Complete digital transformation for a tech startup",
      category: "web",
      tags: ["Next.js", "AWS", "Stripe"],
      image: "/projects/techflow.jpg",
      images: ["/projects/techflow-1.jpg", "/projects/techflow-2.jpg"],
      client: "TechFlow Inc.",
      year: "2024",
      duration: "12 weeks",
      role: "Lead Agency",
      technologies: ["Next.js", "AWS", "PostgreSQL", "Stripe", "Docker"],
      features: [
        "Multi-tenant architecture",
        "Subscription billing",
        "Analytics dashboard",
        "API integration"
      ],
      liveUrl: "https://techflow.example.com",
      stats: {
        views: "50K+",
        likes: "2K+",
        performance: "98/100"
      },
      testimonial: {
        text: "EG Studio transformed our vision into reality. The results exceeded our expectations!",
        author: "John Smith",
        role: "CEO, TechFlow"
      },
      color: "from-coral to-purple",
      featured: true
    },
    {
      id: "fashion-brand",
      title: "Luxe Fashion",
      description: "Luxury fashion e-commerce with AR try-on features",
      category: "ecommerce",
      tags: ["Shopify", "AR", "3D"],
      image: "/projects/fashion.jpg",
      client: "Luxe Fashion House",
      year: "2024",
      duration: "10 weeks",
      role: "Full Service Agency",
      technologies: ["Shopify Plus", "React", "AR.js", "Three.js"],
      features: [
        "AR try-on experience",
        "3D product views",
        "International shipping",
        "Influencer portal"
      ],
      liveUrl: "https://luxe.example.com",
      color: "from-purple to-mint",
      featured: true
    },
    {
      id: "fintech-app",
      title: "CryptoVault",
      description: "Secure cryptocurrency trading platform",
      category: "fintech",
      tags: ["React", "Blockchain", "Security"],
      image: "/projects/crypto.jpg",
      client: "CryptoVault Ltd.",
      year: "2023",
      duration: "16 weeks",
      role: "Technical Partner",
      technologies: ["React", "Web3.js", "Node.js", "PostgreSQL"],
      features: [
        "Multi-chain support",
        "Advanced security",
        "Real-time trading",
        "Portfolio analytics"
      ],
      color: "from-mint to-sunset",
      featured: false
    }
  ];

  const projects = isAgencyMode ? agencyProjects : personalProjects;
  const categories = ["all", ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // GSAP Animations
  useEffect(() => {
    if (isInView && projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll(".project-card");
      
      gsap.fromTo(
        cards,
        { 
          y: 60,
          opacity: 0,
          scale: 0.9,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isInView, filteredProjects]);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        {/* Minimal Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
          
          {/* Subtle Gradient Orbs */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px]"
            style={{ y }}
          >
            <div className="w-full h-full bg-gradient-to-br from-coral/5 to-transparent rounded-full blur-3xl" />
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px]"
            style={{ y: useTransform(y, (value) => value * -1) }}
          >
            <div className="w-full h-full bg-gradient-to-br from-mint/5 to-transparent rounded-full blur-3xl" />
          </motion.div>
        </div>

        <motion.div 
          className="container mx-auto px-6 lg:px-12"
          style={{ opacity, scale }}
        >
          {/* Minimal Header */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <motion.div 
                  className="inline-flex items-center gap-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-coral" />
                  <span className="text-sm font-medium text-coral uppercase tracking-wider">
                    {isAgencyMode ? "Case Studies" : "Featured Work"}
                  </span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
                  <span className="block text-gradient">
                    {isAgencyMode ? "Client Success Stories" : "Recent Projects"}
                  </span>
                </h2>
                
                <p className="mt-4 text-lg text-steel max-w-2xl">
                  {isAgencyMode 
                    ? "Transforming visions into digital excellence"
                    : "Crafting digital experiences with passion and precision"
                  }
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                {[
                  { mode: "grid" as const, icon: Grid3x3 },
                  { mode: "list" as const, icon: LayoutGrid },
                  { mode: "minimal" as const, icon: Square }
                ].map(({ mode, icon: Icon }) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === mode 
                        ? "glass-strong text-coral" 
                        : "glass-subtle text-steel hover:text-cream"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <ProjectFilters
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            projectCount={filteredProjects.length}
          />

          {/* Projects Grid */}
          <div ref={projectsRef}>
            <ProjectGrid
              projects={filteredProjects}
              viewMode={viewMode}
              onProjectClick={setSelectedProject}
              hoveredProject={hoveredProject}
              onProjectHover={setHoveredProject}
              isAgencyMode={isAgencyMode}
            />
          </div>

          {/* Stats Bar */}
          {isAgencyMode && (
            <motion.div
              className="mt-20 glass-subtle rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: TrendingUp, label: "Success Rate", value: "100%" },
                  { icon: Award, label: "Awards Won", value: "15+" },
                  { icon: Globe, label: "Countries", value: "20+" },
                  { icon: Heart, label: "Happy Clients", value: "50+" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <stat.icon className="w-8 h-8 text-coral mx-auto mb-3" />
                    <div className="text-2xl font-bold text-cream">{stat.value}</div>
                    <div className="text-sm text-steel">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* View All CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-medium text-cream">View All Projects</span>
              <div className="relative w-12 h-12 rounded-full glass-strong flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-coral to-purple opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <ArrowUpRight className="w-5 h-5 text-cream relative z-10" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)}
            isAgencyMode={isAgencyMode}
          />
        )}
      </AnimatePresence>
    </>
  );
}