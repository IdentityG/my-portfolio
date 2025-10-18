"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQSectionProps {
  isAgencyMode: boolean;
}

export default function FAQSection({ isAgencyMode }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isAgencyMode ? [
    {
      question: "What services does your agency offer?",
      answer: "We offer comprehensive digital solutions including web development, UI/UX design, brand identity, e-commerce solutions, and digital marketing strategies."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while complex applications can take 2-6 months. We'll provide a detailed timeline during consultation."
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer flexible pricing based on project requirements. Our packages start from $999 for basic websites and scale based on features and complexity. We also offer monthly retainer options."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer maintenance packages starting from $99/month that include updates, security patches, performance monitoring, and technical support."
    }
  ] : [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in React, Next.js, TypeScript, Tailwind CSS, and modern web technologies. I also have experience with Node.js, GraphQL, and various databases."
    },
    {
      question: "Are you available for freelance work?",
      answer: "Yes! I'm available for freelance projects, both short-term and long-term engagements. I can work remotely with clients worldwide."
    },
    {
      question: "What's your typical project process?",
      answer: "I follow an agile approach: Discovery → Design → Development → Testing → Launch. I maintain clear communication throughout and provide regular updates."
    },
    {
      question: "Can you work with existing codebases?",
      answer: "Absolutely! I'm experienced in working with legacy code, refactoring, and adding new features to existing applications."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-display font-bold text-cream mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-steel max-w-2xl mx-auto">
          {isAgencyMode 
            ? "Find answers to common questions about our services"
            : "Get answers to questions I'm frequently asked"
          }
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="glass-subtle rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-coral" />
                <span className="font-medium text-cream">{faq.question}</span>
              </div>
              
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-steel" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-steel pl-8">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}