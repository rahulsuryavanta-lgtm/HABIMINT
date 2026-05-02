// B2B Teaser Section Component for Habimint
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const B2BTeaser: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: 'Bulk Orders',
      description: 'Special pricing for corporate orders of 20+ units',
    },
    {
      icon: Users,
      title: 'Team Wellness',
      description: 'Enhance your team\'s productivity and well-being',
    },
    {
      icon: TrendingUp,
      title: 'Custom Branding',
      description: 'Add your company logo and personalized messaging',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-habimint-primary to-habimint-primary-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Workplace
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Partner with Habimint to bring wellness and personal growth to your entire organization.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <feature.icon className="w-12 h-12 mb-4 mx-auto" />
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/b2b">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-habimint-primary hover:bg-white/90 border-white"
              >
                Explore B2B Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};