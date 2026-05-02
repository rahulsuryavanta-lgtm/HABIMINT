// Footer Component for Habimint
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail } from 'lucide-react';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants';
import { subscribeNewsletter } from '@/lib/api';
import { Logo } from '../ui/Logo';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
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
    <footer className="bg-habimint-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="w-48 mb-6">
              <Logo variant="white" showTagline={true} />
            </div>
            <p className="text-habimint-primary-light text-sm leading-relaxed">
              Premium Indian wellness and self-growth journals designed to help you transform from self-awareness to limitless potential.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-habimint-primary-light hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-habimint-primary-light hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-habimint-primary-light hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Join the Journey</h3>
            <p className="text-habimint-primary-light text-sm mb-4">
              Subscribe to get wellness tips and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-full border-white text-white hover:bg-white hover:text-habimint-dark"
                isLoading={isSubscribing}
                disabled={isSubscribing}
              >
                Subscribe
              </Button>
              {subscribeStatus === 'success' && (
                <p className="text-habimint-accent-green text-sm">Successfully subscribed!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-sm">Failed to subscribe. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Social Media and Legal */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-habimint-primary-light hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p className="text-habimint-primary-light text-sm">
              © {new Date().getFullYear()} Habimint. From Aham to Ananta.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};