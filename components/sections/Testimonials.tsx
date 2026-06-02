// Testimonials Section Component for Habimint
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialCard } from '../ui/TestimonialCard';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '@/lib/constants/constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-habimint-bg">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Community Says"
          subtitle="Real stories from people who've transformed their lives with Habimint"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.15 }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};