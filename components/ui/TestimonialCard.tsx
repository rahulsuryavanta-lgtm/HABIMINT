// Testimonial Card Component for Habimint
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  className 
}) => {
  return (
    <motion.div
      className={cn(
        'bg-habimint-bg-secondary rounded-2xl p-8 border border-habimint-primary-light/30 hover:border-habimint-primary/50 transition-all duration-300',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(45, 90, 39, 0.1)' }}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-10 h-10 text-habimint-accent opacity-50" />
      </div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={cn(
              'w-5 h-5',
              index < testimonial.rating
                ? 'fill-habimint-accent-green text-habimint-accent-green'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>

      {/* Review Content */}
      <p className="text-habimint-text text-base leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-habimint-primary-light flex items-center justify-center">
          <span className="text-habimint-primary font-heading font-bold text-xl">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        
        {/* Name and Title */}
        <div>
          <h4 className="font-heading font-semibold text-habimint-text">
            {testimonial.name}
          </h4>
          <p className="text-sm text-habimint-text-light">
            {testimonial.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};