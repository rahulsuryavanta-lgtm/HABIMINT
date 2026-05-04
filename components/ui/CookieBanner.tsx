'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'habimint_cookie_consent';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const v = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!v) {
        // small delay so it slides up after page paints
        const t = setTimeout(() => setShow(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setShow(true);
    }
  }, []);

  const dismiss = (value: 'accepted' | 'declined') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed left-0 right-0 bottom-0 z-[1000]"
          style={{
            backgroundColor: '#1E2A3A',
            padding: '16px 32px',
            paddingLeft: 'max(16px, env(safe-area-inset-left))',
            paddingRight: 'max(16px, env(safe-area-inset-right))',
          }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p
              className="text-white text-sm leading-relaxed"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
            >
              <span className="mr-2">🍪</span>
              We use cookies to enhance your browsing experience and analyze site traffic. By continuing, you agree to our{' '}
              <Link
                href="/privacy-policy"
                className="underline hover:opacity-80 transition"
                style={{ color: '#C8DEC8' }}
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => dismiss('declined')}
                className="rounded-full px-5 py-3 text-sm transition hover:bg-white/10 w-full md:w-auto min-h-[44px]"
                style={{
                  border: '1px solid rgba(255,255,255,0.9)',
                  color: '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Decline
              </button>
              <button
                onClick={() => dismiss('accepted')}
                className="rounded-full px-5 py-3 text-sm transition hover:brightness-110 w-full md:w-auto min-h-[44px]"
                style={{
                  backgroundColor: '#2D5A27',
                  color: '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
