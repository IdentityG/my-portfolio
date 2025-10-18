"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  MessageCircle, 
  Send, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Phone,
  Building2,
  FileText,
  DollarSign,
  Calendar,
  Paperclip
} from "lucide-react";

interface ContactFormProps {
  services: any[];
  selectedService: string;
  onServiceChange: (service: string) => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  isAgencyMode: boolean;
}

export default function ContactForm({
  services,
  selectedService,
  onServiceChange,
  onSubmit,
  isSubmitting,
  status,
  isAgencyMode
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    timeline: "",
    message: "",
    attachment: null as File | null
  });

  const [errors, setErrors] = useState<any>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        service: selectedService
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  const budgetOptions = [
    "< $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+"
  ];

  const timelineOptions = [
    "ASAP",
    "Within 1 month",
    "1-3 months",
    "3-6 months",
    "6+ months"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-cream">
          What can I help you with? *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => onServiceChange(service.id)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedService === service.id
                    ? "glass-strong border-coral text-cream"
                    : "glass-subtle border-steel/20 text-steel hover:text-cream hover:border-coral/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-sm font-medium">{service.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Name & Email Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cream">Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                errors.name 
                  ? "border-red-500" 
                  : focusedField === "name"
                  ? "border-coral"
                  : "border-steel/20"
              } bg-transparent text-cream placeholder-steel/50 focus:outline-none`}
              placeholder="John Doe"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cream">Email *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                errors.email 
                  ? "border-red-500" 
                  : focusedField === "email"
                  ? "border-coral"
                  : "border-steel/20"
              } bg-transparent text-cream placeholder-steel/50 focus:outline-none`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Phone & Company Row (Optional) */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cream">Phone (Optional)</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                focusedField === "phone" ? "border-coral" : "border-steel/20"
              } bg-transparent text-cream placeholder-steel/50 focus:outline-none`}
              placeholder="+1 (234) 567-890"
            />
          </div>
        </div>

        {/* Company Field */}
        {isAgencyMode && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-cream">Company (Optional)</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                  focusedField === "company" ? "border-coral" : "border-steel/20"
                } bg-transparent text-cream placeholder-steel/50 focus:outline-none`}
                placeholder="Your Company"
              />
            </div>
          </div>
        )}
      </div>

      {/* Budget & Timeline Row */}
      {isAgencyMode && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Budget Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-cream">Budget Range</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                onFocus={() => setFocusedField("budget")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                  focusedField === "budget" ? "border-coral" : "border-steel/20"
                } bg-transparent text-cream focus:outline-none appearance-none cursor-pointer`}
              >
                <option value="" className="bg-ink text-steel">Select budget</option>
                {budgetOptions.map(option => (
                  <option key={option} value={option} className="bg-ink">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-cream">Timeline</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                onFocus={() => setFocusedField("timeline")}
                onBlur={() => setFocusedField(null)}
                className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
                  focusedField === "timeline" ? "border-coral" : "border-steel/20"
                } bg-transparent text-cream focus:outline-none appearance-none cursor-pointer`}
              >
                <option value="" className="bg-ink text-steel">Select timeline</option>
                {timelineOptions.map(option => (
                  <option key={option} value={option} className="bg-ink">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Message Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-cream">Message *</label>
        <div className="relative">
          <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-steel" />
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={6}
            className={`w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border transition-all ${
              errors.message 
                ? "border-red-500" 
                : focusedField === "message"
                ? "border-coral"
                : "border-steel/20"
            } bg-transparent text-cream placeholder-steel/50 focus:outline-none resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-cream">Attachment (Optional)</label>
        <motion.label
          className="flex items-center justify-center gap-3 p-4 glass-subtle rounded-xl border border-dashed border-steel/20 cursor-pointer hover:border-coral/50 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Paperclip className="w-5 h-5 text-steel" />
          <span className="text-sm text-steel">
            {formData.attachment ? formData.attachment.name : "Drop files or click to upload"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData(prev => ({ ...prev, attachment: file }));
              }
            }}
          />
        </motion.label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full relative px-8 py-4 overflow-hidden rounded-xl group"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-coral to-purple" />
        
        <span className="relative flex items-center justify-center gap-2 text-cream font-semibold">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Message Sent!
            </>
          ) : status === "error" ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Failed to Send
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </span>
      </motion.button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 glass-subtle rounded-xl border border-mint/30"
          >
            <p className="text-sm text-mint">
              Thank you for your message! I'll get back to you within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}