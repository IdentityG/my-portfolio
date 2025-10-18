"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Target, Eye, Zap, Users, Award, Rocket, Globe, CheckCircle } from "lucide-react";

interface TabNavigationProps {
    activeTab: "story" | "mission" | "values";
    setActiveTab: (tab: "story" | "mission" | "values") => void;
    isAgencyMode: boolean;
}

export default function TabNavigation({ activeTab, setActiveTab, isAgencyMode }: TabNavigationProps) {
    const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);

    const personalValues = [
        { icon: Heart, title: "Passion", description: "Love for creating beautiful, functional designs" },
        { icon: Zap, title: "Innovation", description: "Always exploring new technologies" },
        { icon: Target, title: "Precision", description: "Pixel-perfect attention to detail" },
        { icon: Eye, title: "Vision", description: "Forward-thinking approach" }
    ];

    const agencyValues = [
        { icon: Users, title: "Client-First", description: "Your success is our priority" },
        { icon: Award, title: "Quality", description: "Award-winning standards" },
        { icon: Rocket, title: "Performance", description: "Fast, optimized solutions" },
        { icon: Globe, title: "Global", description: "Working worldwide" }
    ];

    const values = isAgencyMode ? agencyValues : personalValues;

    const tabs = [
        { id: "story", label: "Story" },
        { id: "mission", label: "Mission" },
        { id: "values", label: "Values" }
    ] as const;

    return (
        <div className="space-y-6">
            {/* Tab Headers */}
            <div className="flex gap-2 p-1 backdrop-blur-sm bg-midnight/30 rounded-2xl border border-coral/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id ? "text-cream" : "text-steel/60 hover:text-cream"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-coral/80 to-purple/80 rounded-xl"
                                layoutId="activeTab"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === "story" && (
                    <motion.div
                        key="story"
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="backdrop-blur-sm bg-midnight/40 rounded-2xl p-8 border border-coral/10">
                            <h3 className="text-3xl font-display font-bold text-cream mb-6">
                                {isAgencyMode ? "Our Story" : "My Journey"}
                            </h3>

                            <div className="space-y-4 text-steel/90 leading-relaxed">
                                <p>
                                    {isAgencyMode
                                        ? "Founded with a vision to bridge creativity and technology, EG Creative Studio has evolved from a solo venture into a trusted partner for businesses worldwide. We believe in design's power to transform brands and drive growth."
                                        : "My journey began with a fascination for how design and code create magic on the web. From 'Hello World' to complex applications, every project has been a stepping stone in mastering digital creation."
                                    }
                                </p>
                                <p>
                                    {isAgencyMode
                                        ? "Today, we specialize in creating bespoke digital solutions that look stunning and deliver measurable results. Our approach combines artistic vision with technical excellence, ensuring every project exceeds expectations."
                                        : "I specialize in creating interfaces that are visually appealing, intuitive, and performant. My approach combines creative design thinking with modern development practices, always pushing boundaries."
                                    }
                                </p>
                            </div>

                            {/* Highlight Points */}
                            <div className="grid sm:grid-cols-2 gap-3 mt-8">
                                {(isAgencyMode ? [
                                    "Award-winning design team",
                                    "Cutting-edge technology",
                                    "Global client portfolio",
                                    "100% success rate"
                                ] : [
                                    "Full-stack expertise",
                                    "UI/UX specialization",
                                    "Open source contributor",
                                    "Continuous learner"
                                ]).map((point, index) => (
                                    <motion.div
                                        key={point}
                                        className="flex items-center gap-3 group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0 group-hover:bg-coral/30 transition-colors">
                                            <CheckCircle className="w-4 h-4 text-coral" />
                                        </div>
                                        <span className="text-cream">{point}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "mission" && (
                    <motion.div
                        key="mission"
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        {(isAgencyMode ? [
                            {
                                icon: Target,
                                title: "Our Mission",
                                content: "To empower businesses with digital solutions that drive growth, inspire audiences, and create lasting impact in the digital landscape."
                            },
                            {
                                icon: Eye,
                                title: "Our Vision",
                                content: "To be the leading creative studio known for transforming ideas into extraordinary digital experiences that set new industry standards."
                            },
                            {
                                icon: Heart,
                                title: "Our Promise",
                                content: "Excellence in every pixel and line of code, ensuring your investment translates into measurable success and exceptional user experiences."
                            }
                        ] : [
                            {
                                icon: Target,
                                title: "My Mission",
                                content: "To craft digital experiences that meet technical requirements while inspiring, engaging, and leaving lasting impressions on users."
                            },
                            {
                                icon: Eye,
                                title: "My Vision",
                                content: "To continuously push web development boundaries, creating innovative solutions that shape the future of digital interaction."
                            },
                            {
                                icon: Zap,
                                title: "My Approach",
                                content: "Combining creative design thinking with robust development practices to deliver beautiful, functional, and performant solutions."
                            }
                        ]).map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    className="backdrop-blur-sm bg-midnight/40 rounded-2xl p-6 border border-coral/10 hover:border-coral/20 transition-colors group"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="flex gap-4">
                                        <motion.div
                                            className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center flex-shrink-0"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon className="w-7 h-7 text-coral" />
                                        </motion.div>
                                        <div>
                                            <h4 className="text-xl font-display font-bold text-cream mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-steel/90 leading-relaxed">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {activeTab === "values" && (
                    <motion.div
                        key="values"
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    className="relative group backdrop-blur-sm bg-midnight/40 rounded-2xl p-6 border border-coral/10 hover:border-coral/30 transition-colors overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, type: "spring" }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onHoverStart={() => setHoveredValue(index)}
                                    onHoverEnd={() => setHoveredValue(null)}
                                >
                                    {/* Hover Gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-coral/10 to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center mb-4"
                                            animate={hoveredValue === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon className="w-7 h-7 text-coral" />
                                        </motion.div>
                                        <h4 className="text-xl font-display font-bold text-cream mb-2">
                                            {value.title}
                                        </h4>
                                        <p className="text-sm text-steel/80 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* Animated Corner Accent */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-coral/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}