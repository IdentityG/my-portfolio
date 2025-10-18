"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  User,
  Briefcase,
  Award,
  Heart,
  MessageCircle,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  Shield,
  Zap,
  Circle,
  ArrowUpRight,
  Building2,
  MapPin,
  Calendar,
  CheckCircle
} from "lucide-react";
import TestimonialCard from "./testimonials/TestimonialCard";
import TestimonialSlider from "./testimonials/TestimonialSlider";
import ClientLogos from "./testimonials/ClientLogos";
import ReviewStats from "./testimonials/ReviewStats";
import VideoTestimonial from "./testimonials/VideoTestimonial";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location?: string;
  avatar?: string;
  rating: number;
  text: string;
  highlight?: string;
  project?: string;
  date: string;
  verified: boolean;
  type: "text" | "video";
  videoUrl?: string;
  tags?: string[];
}

interface TestimonialsSectionProps {
  isAgencyMode?: boolean;
}

export default function TestimonialsSection({ isAgencyMode = false }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "5star" | "recent">("all");
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const personalTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      location: "San Francisco, CA",
      rating: 5,
      text: "Egnuma delivered an exceptional portfolio website that exceeded our expectations. The attention to detail and creative solutions were outstanding. Our conversion rate increased by 40% after the redesign!",
      highlight: "40% increase in conversions",
      project: "E-commerce Platform",
      date: "2024",
      verified: true,
      type: "text",
      tags: ["Web Design", "React", "Performance"]
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLabs",
      location: "New York, NY",
      rating: 5,
      text: "Working with Egnuma was a game-changer for our startup. The mobile app design was intuitive, beautiful, and our users love it. Highly professional and creative!",
      highlight: "Users love the new design",
      project: "Mobile App UI",
      date: "2024",
      verified: true,
      type: "text",
      tags: ["Mobile Design", "UX", "Branding"]
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      location: "Austin, TX",
      rating: 5,
      text: "The brand identity Egnuma created perfectly captures our vision. From logo to web presence, everything is cohesive and impactful. Best investment we've made!",
      highlight: "Perfect brand identity",
      project: "Brand Redesign",
      date: "2023",
      verified: true,
      type: "video",
      videoUrl: "/testimonials/video1.mp4",
      tags: ["Branding", "Design System"]
    }
  ];

  const agencyTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "David Park",
      role: "CEO",
      company: "Fortune 500 Company",
      location: "London, UK",
      rating: 5,
      text: "EG Creative Studio transformed our digital presence completely. Their strategic approach and execution were flawless. Revenue increased by 60% within 6 months of launch.",
      highlight: "60% revenue increase",
      project: "Enterprise Platform",
      date: "2024",
      verified: true,
      type: "text",
      tags: ["Enterprise", "Strategy", "Development"]
    },
    {
      id: "2",
      name: "Lisa Thompson",
      role: "CMO",
      company: "Global Retail Brand",
      location: "Paris, France",
      rating: 5,
      text: "The e-commerce solution EG Studio built handles millions of transactions seamlessly. Their expertise in scalability and user experience is unmatched.",
      highlight: "Millions of transactions",
      project: "E-commerce Platform",
      date: "2024",
      verified: true,
      type: "video",
      videoUrl: "/testimonials/video2.mp4",
      tags: ["E-commerce", "Scale", "Performance"]
    },
    {
      id: "3",
      name: "James Wilson",
      role: "CTO",
      company: "Tech Unicorn",
      location: "Singapore",
      rating: 5,
      text: "EG Studio didn't just deliver a product; they became our technology partner. Their innovative solutions helped us secure $10M in funding.",
      highlight: "$10M funding secured",
      project: "SaaS Platform",
      date: "2023",
      verified: true,
      type: "text",
      tags: ["SaaS", "Innovation", "Partnership"]
    }
  ];

  const testimonials = isAgencyMode ? agencyTestimonials : personalTestimonials;
  
  // Filter testimonials
  const filteredTestimonials = selectedFilter === "all" 
    ? testimonials
    : selectedFilter === "5star"
    ? testimonials.filter(t => t.rating === 5)
    : testimonials.sort((a, b) => parseInt(b.date) - parseInt(a.date));

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  // GSAP Animations
  useEffect(() => {
    if (isInView && sectionRef.current) {
      gsap.fromTo(
        ".testimonial-stat",
        { 
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }, [isInView]);

  const stats = isAgencyMode ? [
    { icon: Star, value: "5.0", label: "Average Rating", color: "from-coral to-sunset" },
    { icon: Heart, value: "100%", label: "Satisfaction", color: "from-sunset to-purple" },
    { icon: Briefcase, value: "50+", label: "Happy Clients", color: "from-purple to-mint" },
    { icon: Award, value: "15+", label: "Awards Won", color: "from-mint to-coral" }
  ] : [
    { icon: Star, value: "4.9", label: "Rating", color: "from-coral to-sunset" },
    { icon: ThumbsUp, value: "98%", label: "Recommend", color: "from-sunset to-purple" },
    { icon: User, value: "40+", label: "Clients", color: "from-purple to-mint" },
    { icon: CheckCircle, value: "100%", label: "Completion", color: "from-mint to-coral" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Quotes */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Quote className="w-20 h-20 text-coral" />
            </motion.div>
          ))}
        </div>

        {/* Gradient Mesh */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px]"
          style={{ y }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple/10 via-coral/5 to-transparent rounded-full blur-3xl" />
        </motion.div>
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
              {isAgencyMode ? "Client Success Stories" : "What Clients Say"}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="block text-gradient">
              {isAgencyMode ? "Trusted by Industry Leaders" : "Client Testimonials"}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-steel max-w-3xl mx-auto">
            {isAgencyMode 
              ? "Join hundreds of satisfied clients who've transformed their business with our solutions"
              : "Real feedback from amazing clients I've had the pleasure to work with"
            }
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="testimonial-stat glass-subtle rounded-2xl p-6 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="w-6 h-6 text-cream" />
                </motion.div>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-steel">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { id: "all", label: "All Reviews" },
            { id: "5star", label: "5 Star Only" },
            { id: "recent", label: "Most Recent" }
          ].map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter.id
                  ? "glass-strong text-cream"
                  : "glass-subtle text-steel hover:text-cream"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <TestimonialSlider
            testimonials={filteredTestimonials}
            activeIndex={activeTestimonial}
            onIndexChange={setActiveTestimonial}
            isAutoPlaying={isAutoPlaying}
            onAutoPlayToggle={() => setIsAutoPlaying(!isAutoPlaying)}
            isAgencyMode={isAgencyMode}
          />
        </div>

        {/* Testimonial Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isHovered={hoveredCard === testimonial.id}
              onHover={setHoveredCard}
              isCompact={true}
            />
          ))}
        </motion.div>

        {/* Client Logos */}
        {isAgencyMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ClientLogos />
          </motion.div>
        )}

        {/* Review Stats */}
        <ReviewStats isAgencyMode={isAgencyMode} />

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="glass-subtle rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
              {isAgencyMode 
                ? "Join Our Success Stories" 
                : "Let's Create Something Amazing"}
            </h3>
            <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
              {isAgencyMode 
                ? "Be our next success story. Let's discuss how we can transform your business."
                : "Ready to work together? Let's discuss your project and bring your vision to life."
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="group relative px-8 py-4 overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple" />
                <span className="relative flex items-center gap-2 text-cream font-semibold">
                  {isAgencyMode ? "Schedule Consultation" : "Start Your Project"}
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </motion.button>
              
              <motion.button
                className="px-8 py-4 rounded-full glass border border-coral/30 text-cream font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Read More Reviews
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}