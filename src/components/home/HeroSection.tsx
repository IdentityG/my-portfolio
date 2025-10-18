// components/home/HeroSection.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import {
    ArrowRight,
    Download,
    Star,
    Zap,
    TrendingUp,
    Award
} from "lucide-react";
import AnimatedLogo from "./utils/AnimatedLogo";
import TypewriterHeadline from "./utils/TypewriterHeadline";
import ParticleBackground from "./utils/ParticleBackground";
import ModeToggle from "./utils/ModeToggle";
import FloatingElements from "./utils/FloatingElements";

interface HeroSectionProps {
    isAgencyMode: boolean;
    setIsAgencyMode: (value: boolean) => void;
}

export default function HeroSection({ isAgencyMode, setIsAgencyMode }: HeroSectionProps) {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            setCursorPosition({ x: clientX, y: clientY });
            mouseX.set((clientX - innerWidth / 2) / 25);
            mouseY.set((clientY - innerHeight / 2) / 25);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".hero-content > *",
                {
                    opacity: 0,
                    y: 50,
                    filter: "blur(10px)"
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );
        });

        return () => ctx.revert();
    }, [isAgencyMode]);

    const stats = isAgencyMode ? [
        { label: "Projects", value: "100+", icon: TrendingUp },
        { label: "Clients", value: "50+", icon: Award },
        { label: "Awards", value: "10+", icon: Star }
    ] : [
        { label: "Projects", value: "75+", icon: TrendingUp },
        { label: "Experience", value: "5+ Yrs", icon: Zap },
        { label: "Clients", value: "40+", icon: Star }
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Enhanced Background */}
            <div className="absolute inset-0 -z-10">
                <ParticleBackground mode={isAgencyMode ? "agency" : "personal"} />

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute inset-0"
                    style={{ x: smoothMouseX, y: smoothMouseY }}
                >
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coral/20 rounded-full blur-[100px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-mint/20 rounded-full blur-[120px]"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple/20 rounded-full blur-[80px]"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                </motion.div>

                {/* Minimal Grid Pattern */}
                <motion.div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ opacity }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
                </motion.div>
            </div>

            <FloatingElements isAgencyMode={isAgencyMode} />

            {/* Main Content */}
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10"
                style={{ y }}
            >
                <div className="max-w-5xl mx-auto">
                    {/* Mode Toggle */}
                    <motion.div
                        className="flex justify-center mb-8 md:mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ModeToggle
                            isAgencyMode={isAgencyMode}
                            onChange={setIsAgencyMode}
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="hero-content space-y-6 md:space-y-8">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <AnimatedLogo isAgencyMode={isAgencyMode} />
                        </div>

                        {/* Headlines */}
                        <motion.div
                            key={isAgencyMode ? "agency" : "personal"}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-6"
                        >
                            <div>
                                <motion.p
                                    className="text-lg md:text-xl text-steel/80 mb-3"
                                    style={{ x: smoothMouseX }}
                                >
                                    {isAgencyMode ? "✨ Welcome to" : "👋 Hello, I'm"}
                                </motion.p>
                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4">
                                    <span className="text-gradient">
                                        {isAgencyMode ? "Identity Studio" : "Egnuma Gelana"}
                                    </span>
                                </h1>
                            </div>

                            <TypewriterHeadline
                                phrases={isAgencyMode ? [
                                    "Web Design Agency",
                                    "Brand Identity Experts",
                                    "Digital Solutions"
                                ] : [
                                    "Frontend Developer",
                                    "UI/UX Designer",
                                    "Creative Technologist"
                                ]}
                            />

                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-steel/90 max-w-2xl mx-auto leading-relaxed px-4"
                                style={{ y: smoothMouseY }}
                            >
                                {isAgencyMode
                                    ? "Transform your vision into reality with cutting-edge design and development. We create brands that inspire."
                                    : "Crafting exceptional digital experiences through modern web technologies and thoughtful design. Let's build something extraordinary."
                                }
                            </motion.p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                className="group relative px-8 py-4 bg-gradient-to-r from-coral via-sunset to-purple rounded-full overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple via-sunset to-coral"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: "0%" }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative flex items-center gap-2 text-cream font-semibold">
                                    {isAgencyMode ? "Start Project" : "View Work"}
                                    <motion.div
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </span>
                            </motion.button>

                            <motion.button
                                className="group relative px-8 py-4 rounded-full overflow-hidden border border-coral/30 hover:border-coral/60 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-coral/10 to-purple/10"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative flex items-center gap-2 text-cream font-semibold">
                                    {isAgencyMode ? "Portfolio" : "Download CV"}
                                    <Download className="w-5 h-5" />
                                </span>
                            </motion.button>
                        </div>

                        {/* Minimal Stats */}
                        <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-2xl mx-auto pt-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center group cursor-default"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <motion.div
                                        className="flex justify-center mb-2"
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <stat.icon className="w-5 h-5 text-coral/60 group-hover:text-coral transition-colors" />
                                    </motion.div>
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-steel/60 group-hover:text-steel/90 transition-colors">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-2 text-steel/40"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-coral/30 rounded-full p-1">
                            <motion.div
                                className="w-1 h-2 bg-coral/50 rounded-full mx-auto"
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Floating Accent Elements */}
            <motion.div
                className="absolute top-20 left-10 w-2 h-2 bg-coral rounded-full hidden lg:block"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-40 right-20 w-3 h-3 bg-mint rounded-full hidden lg:block"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute bottom-32 left-20 w-2 h-2 bg-purple rounded-full hidden lg:block"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            {/* Cursor Follower Effect */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-6 h-6 bg-coral/20 rounded-full blur-xl hidden lg:block"
                animate={{
                    x: cursorPosition.x - 12,
                    y: cursorPosition.y - 12,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.5
                }}
            />
        </section>
    );
}

