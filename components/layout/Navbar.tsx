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

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const itemCount = getItemCount();

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Determine colors based on scroll state
  const linkColor = isScrolled ? 'text-habimint-primary-light' : 'text-white';
  const hoverColor = 'hover:text-white';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-habimint-primary shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo linkTo="/" showTagline={false} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkColor} ${hoverColor} transition-colors font-medium relative group`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ShoppingCart className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
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
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <User className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${linkColor}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${linkColor}`} />
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
              className="absolute top-20 right-0 w-full max-w-sm bg-habimint-primary shadow-2xl"
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
                    className="block py-3 px-4 text-lg font-medium text-habimint-primary-light hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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