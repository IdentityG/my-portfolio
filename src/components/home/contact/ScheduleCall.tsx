"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  Clock,
  Video,
  Phone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Mail
} from "lucide-react";

interface ScheduleCallProps {
  isAgencyMode: boolean;
}

export default function ScheduleCall({ isAgencyMode }: ScheduleCallProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [callType, setCallType] = useState<"video" | "phone">("video");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-2xl font-display font-bold text-cream mb-2">
          Schedule a {isAgencyMode ? "Consultation" : "Call"}
        </h3>
        <p className="text-steel">
          {isAgencyMode 
            ? "Book a free 30-minute consultation to discuss your project"
            : "Let's have a chat about your project ideas"}
        </p>
      </div>

      {/* Call Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-cream">Call Type</label>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            onClick={() => setCallType("video")}
            className={`p-3 rounded-xl border transition-all ${
              callType === "video"
                ? "glass-strong border-coral text-cream"
                : "glass-subtle border-steel/20 text-steel hover:text-cream"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Video Call</span>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => setCallType("phone")}
            className={`p-3 rounded-xl border transition-all ${
              callType === "phone"
                ? "glass-strong border-coral text-cream"
                : "glass-subtle border-steel/20 text-steel hover:text-cream"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Phone Call</span>
          </motion.button>
        </div>
      </div>

      {/* Calendar */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-cream">Select Date</label>
        <div className="glass-subtle rounded-xl p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 rounded-lg hover:bg-coral/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-cream" />
            </button>
            
            <h4 className="text-cream font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 rounded-lg hover:bg-coral/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-cream" />
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs text-steel p-2">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <motion.button
                    type="button"
                    onClick={() => !isPastDate(date) && setSelectedDate(date)}
                    disabled={isPastDate(date)}
                    className={`w-full h-full rounded-lg text-sm transition-all ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? "bg-gradient-to-br from-coral to-purple text-cream"
                        : isToday(date)
                        ? "glass-strong text-coral"
                        : isPastDate(date)
                        ? "text-steel/30 cursor-not-allowed"
                        : "text-steel hover:glass-subtle hover:text-cream"
                    }`}
                    whileHover={!isPastDate(date) ? { scale: 1.1 } : {}}
                    whileTap={!isPastDate(date) ? { scale: 0.95 } : {}}
                  >
                    {date.getDate()}
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="text-sm font-medium text-cream">Select Time</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <motion.button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-lg text-sm transition-all ${
                  selectedTime === time
                    ? "glass-strong text-cream"
                    : "glass-subtle text-steel hover:text-cream"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contact Info */}
      {selectedDate && selectedTime && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cream">Name *</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border border-steel/20 bg-transparent text-cream placeholder-steel/50 focus:outline-none focus:border-coral transition-colors"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-cream">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 glass-subtle rounded-xl border border-steel/20 bg-transparent text-cream placeholder-steel/50 focus:outline-none focus:border-coral transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="glass-subtle rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-cream mb-1">
                  Booking {callType === "video" ? "Video" : "Phone"} Call
                </p>
                <p className="text-steel">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="button"
            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-coral to-purple text-cream font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Confirm Booking
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}