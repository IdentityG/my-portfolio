"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Briefcase, GraduationCap, Rocket, Users } from "lucide-react";

interface ExperienceTimelineProps {
    isAgencyMode: boolean;
}

export default function ExperienceTimeline({ isAgencyMode }: ExperienceTimelineProps) {
    const experiences = isAgencyMode ? [
        {
            year: "2024",
            title: "International Recognition",
            description: "Featured in top design galleries and won multiple awards",
            icon: Award,
            color: "from-coral to-sunset"
        },
        {
            year: "2023",
            title: "Studio Expansion",
            description: "Grew team to 15+ and doubled client portfolio",
            icon: Users,
            color: "from-purple to-coral"
        },
        {
            year: "2022",
            title: "Agency Launch",
            description: "Founded EG Creative Studio with bold vision",
            icon: Rocket,
            color: "from-mint to-purple"
        },
        {
            year: "2020",
            title: "Freelance Success",
            description: "Built portfolio of 50+ successful projects",
            icon: Briefcase,
            color: "from-coral to-mint"
        }
    ] : [
        {
            year: "2024",
            title: "Senior Developer",
            description: "Leading frontend architecture and mentoring junior developers",
            icon: Briefcase,
            color: "from-coral to-sunset"
        },
        {
            year: "2022",
            title: "Full Stack Developer",
            description: "Expanded expertise to backend development and cloud solutions",
            icon: Award,
            color: "from-purple to-coral"
        },
        {
            year: "2020",
            title: "Frontend Developer",
            description: "Started professional journey building responsive web applications",
            icon: Briefcase,
            color: "from-mint to-purple"
        },
        {
            year: "2019",
            title: "Computer Science Degree",
            description: "Graduated with honors, specializing in web technologies",
            icon: GraduationCap,
            color: "from-coral to-mint"
        }
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <motion.h3
                    className="text-4xl md:text-5xl font-display font-bold text-cream mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gradient">
                        {isAgencyMode ? "Our Journey" : "Experience Timeline"}
                    </span>
                </motion.h3>
                <motion.p
                    className="text-steel/80 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    {isAgencyMode
                        ? "Building excellence through years of dedication and innovation"
                        : "A journey of continuous learning, growth, and achievement"
                    }
                </motion.p>
            </div>
            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
                {/* Center Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full hidden md:block">
                    <motion.div
                        className="w-full bg-gradient-to-b from-coral via-purple to-mint"
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: "100%", opacity: 0.3 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>

                {/* Timeline Items */}
                <div className="space-y-16 md:space-y-24">
                    {experiences.map((exp, index) => {
                        const Icon = exp.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={exp.year}
                                className="relative"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}>
                                    {/* Content Card */}
                                    <motion.div
                                        className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-center md:text-inherit`}
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                                    >
                                        <motion.div
                                            className="inline-block backdrop-blur-sm bg-midnight/40 rounded-2xl p-6 border border-coral/10 hover:border-coral/30 transition-colors group"
                                            whileHover={{ y: -5, scale: 1.02 }}
                                        >
                                            {/* Hover Gradient */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-coral/5 to-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            />

                                            <div className={`flex items-start gap-4 ${isEven ? "md:flex-row-reverse" : "md:flex-row"
                                                } flex-row justify-center md:justify-start relative z-10`}>
                                                {/* Icon */}
                                                <motion.div
                                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0`}
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <Icon className="w-7 h-7 text-cream" />
                                                </motion.div>

                                                {/* Text Content */}
                                                <div className={isEven ? "md:text-right" : "md:text-left"}>
                                                    <motion.div
                                                        className="inline-block px-3 py-1 rounded-full bg-coral/20 mb-2"
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                                                    >
                                                        <span className="text-coral font-bold text-sm">{exp.year}</span>
                                                    </motion.div>
                                                    <h4 className="text-xl md:text-2xl font-display font-bold text-cream mb-2">
                                                        {exp.title}
                                                    </h4>
                                                    <p className="text-steel/80 leading-relaxed">
                                                        {exp.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Center Node (Desktop) */}
                                    <div className="hidden md:block relative flex-shrink-0">
                                        <motion.div
                                            className="relative z-10"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            {/* Outer Ring */}
                                            <motion.div
                                                className="w-6 h-6 rounded-full border-4 border-ink bg-gradient-to-br from-coral to-purple"
                                                whileHover={{ scale: 1.5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            />

                                            {/* Pulse Effect */}
                                            <motion.div
                                                className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-coral to-purple"
                                                animate={{
                                                    scale: [1, 2, 1],
                                                    opacity: [0.5, 0, 0.5]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.5
                                                }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Empty Space (Desktop) */}
                                    <div className="flex-1 hidden md:block" />
                                </div>

                                {/* Mobile Connector Line */}
                                {index < experiences.length - 1 && (
                                    <div className="md:hidden flex justify-center my-8">
                                        <motion.div
                                            className="w-px h-16 bg-gradient-to-b from-coral to-purple opacity-30"
                                            initial={{ height: 0 }}
                                            whileInView={{ height: 64 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}