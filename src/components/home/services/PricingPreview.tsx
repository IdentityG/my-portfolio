"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Star, Zap, Crown } from "lucide-react";

export default function PricingPreview() {
  const plans = [
    {
      name: "Starter",
      price: "$999",
      description: "Perfect for small businesses",
      icon: Star,
      color: "from-coral to-sunset",
      features: [
        { name: "5 Page Website", included: true },
        { name: "Responsive Design", included: true },
        { name: "Basic SEO", included: true },
        { name: "Contact Form", included: true },
        { name: "1 Month Support", included: true },
        { name: "Custom Animations", included: false },
        { name: "E-commerce", included: false },
        { name: "CMS Integration", included: false }
      ]
    },
    {
      name: "Professional",
      price: "$2,999",
      description: "For growing businesses",
      icon: Zap,
      color: "from-purple to-coral",
      featured: true,
      features: [
        { name: "10 Page Website", included: true },
        { name: "Responsive Design", included: true },
        { name: "Advanced SEO", included: true },
        { name: "Contact Form", included: true },
        { name: "3 Month Support", included: true },
        { name: "Custom Animations", included: true },
        { name: "E-commerce", included: false },
        { name: "CMS Integration", included: true }
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions",
      icon: Crown,
      color: "from-mint to-purple",
      features: [
        { name: "Unlimited Pages", included: true },
        { name: "Responsive Design", included: true },
        { name: "Premium SEO", included: true },
        { name: "Advanced Forms", included: true },
        { name: "12 Month Support", included: true },
        { name: "Custom Animations", included: true },
        { name: "E-commerce", included: true },
        { name: "CMS Integration", included: true }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-display font-bold text-cream mb-4">
          Transparent Pricing
        </h3>
        <p className="text-steel max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our signature quality and support.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          
          return (
            <motion.div
              key={plan.name}
              className={`relative ${plan.featured ? "md:-mt-4" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-coral to-purple rounded-full">
                  <span className="text-xs font-bold text-cream uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <motion.div
                className={`glass rounded-2xl p-6 h-full ${
                  plan.featured ? "border-2 border-coral/50" : ""
                }`}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                    animate={{ rotate: plan.featured ? [0, 360] : 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon className="w-8 h-8 text-cream" />
                  </motion.div>
                  
                  <h4 className="text-2xl font-display font-bold text-cream mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-steel text-sm mb-4">{plan.description}</p>
                  
                  <div className="text-4xl font-bold text-gradient">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-lg text-steel">/project</span>}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={feature.name}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-mint flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-steel/50 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? "text-cream" : "text-steel/50"
                      }`}>
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-coral to-purple text-cream"
                      : "glass border border-coral/30 text-cream hover:bg-coral/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}