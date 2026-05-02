// Newsletter Section Component for Habimint
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { subscribeNewsletter } from '@/lib/api';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeStatus('idle');

    try {
      // TODO: Replace with actual API call when backend is ready
      // await subscribeNewsletter(email);
      
      // Temporary mock
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscribeStatus('success');
      setEmail('');
      // TODO: Show success toast notification
    } catch (error) {
      setSubscribeStatus('error');
      // TODO: Show error toast notification
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-habimint-bg">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-habimint-primary-light/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-habimint-primary-light rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Mail className="w-8 h-8 text-habimint-primary" />
            </motion.div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-habimint-text mb-4">
              Join Our Wellness Community
            </h2>
            <p className="text-lg text-habimint-text-light">
              Get exclusive tips, early access to new products, and inspiring content delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubscribing}
                disabled={isSubscribing}
                className="sm:w-auto w-full"
              >
                Subscribe
              </Button>
            </div>
            
            {subscribeStatus === 'success' && (
              <motion.p
                className="text-habimint-accent-green text-sm mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✓ Successfully subscribed! Check your inbox for a welcome email.
              </motion.p>
            )}
            {subscribeStatus === 'error' && (
              <motion.p
                className="text-red-500 text-sm mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Failed to subscribe. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};