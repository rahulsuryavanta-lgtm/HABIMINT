// Navbar Component for Habimint
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { Logo } from '../ui/Logo';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="w-48">
              <Logo 
                variant={isScrolled ? 'default' : 'default'}
                showTagline={false}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-habimint-text hover:text-habimint-primary transition-colors font-medium relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-habimint-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                className="p-2 hover:bg-habimint-primary-light/30 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-habimint-text" />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-habimint-primary-light/30 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-habimint-text" />
                {itemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-habimint-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>

              {/* User Icon */}
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                className="p-2 hover:bg-habimint-primary-light/30 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-habimint-text" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-habimint-primary-light/30 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-habimint-text" />
                ) : (
                  <Menu className="w-6 h-6 text-habimint-text" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 right-0 w-full max-w-sm bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="p-6 space-y-4">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 px-4 text-lg font-medium text-habimint-text hover:bg-habimint-primary-light/30 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};