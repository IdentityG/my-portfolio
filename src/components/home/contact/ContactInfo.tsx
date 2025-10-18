"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Globe,
  MessageCircle
} from "lucide-react";

interface ContactInfoProps {
  isAgencyMode: boolean;
}

export default function ContactInfo({ isAgencyMode }: ContactInfoProps) {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@egnumagelana.com",
      href: "mailto:hello@egnumagelana.com",
      color: "from-coral to-sunset"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (234) 567-890",
      href: "tel:+1234567890",
      color: "from-sunset to-purple"
    },
    {
      icon: MapPin,
      label: "Location",
      value: isAgencyMode ? "Serving Globally" : "Available Worldwide",
      href: "#",
      color: "from-purple to-mint"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: "#",
      color: "from-mint to-coral"
    }
  ];

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-2xl font-display font-bold text-cream mb-2">
          {isAgencyMode ? "Let's Talk Business" : "Get In Touch"}
        </h3>
        <p className="text-steel">
          {isAgencyMode 
            ? "Ready to start your project? Contact us today."
            : "I'm always excited to work on new projects."}
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <motion.a
              key={detail.label}
              href={detail.href}
              className="flex items-center gap-4 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${detail.color} p-[1px]`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-full h-full rounded-xl bg-ink flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cream" />
                </div>
              </motion.div>
              
              <div>
                <p className="text-xs text-steel">{detail.label}</p>
                <p className="text-sm font-medium text-cream group-hover:text-coral transition-colors">
                  {detail.value}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Office Hours */}
      <div className="pt-6 border-t border-steel/20">
        <h4 className="text-sm font-semibold text-cream mb-3">
          {isAgencyMode ? "Business Hours" : "Available Hours"}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-steel">Monday - Friday</span>
            <span className="text-cream">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-steel">Saturday</span>
            <span className="text-cream">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-steel">Sunday</span>
            <span className="text-coral">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}