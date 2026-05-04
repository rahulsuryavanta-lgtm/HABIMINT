'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items: TocItem[];
  active: string;
  onClick: (id: string) => void;
}

/**
 * Responsive Table of Contents.
 * - Mobile (< lg): Collapsible accordion at top
 * - Desktop (lg+):  Sticky sidebar
 */
export default function ResponsiveToc({ items, active, onClick }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    onClick(id);
    setOpen(false);
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      {/* Mobile collapsed accordion */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between rounded-2xl px-5 py-3 text-left transition"
          style={{ backgroundColor: '#F5F2E8' }}
          aria-expanded={open}
        >
          <span
            className="font-heading"
            style={{ fontSize: '16px', color: '#2D5A27' }}
          >
            Table of Contents
          </span>
          <ChevronDown
            className="w-5 h-5 transition-transform"
            style={{
              color: '#2D5A27',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2 rounded-2xl"
              style={{ backgroundColor: '#F5F2E8' }}
            >
              <ol className="space-y-1 p-5 max-h-[60vh] overflow-y-auto">
                {items.map((item, idx) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className="text-left w-full py-2 px-2 rounded transition hover:bg-white/40 min-h-[40px]"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: active === item.id ? '#2D5A27' : '#374151',
                        fontWeight: active === item.id ? 600 : 400,
                      }}
                    >
                      {idx + 1}. {item.label}
                    </button>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sidebar */}
      <div
        className="hidden lg:block rounded-2xl p-5"
        style={{
          backgroundColor: '#F5F2E8',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
        }}
      >
        <p
          className="font-heading mb-3"
          style={{ fontSize: '18px', color: '#2D5A27' }}
        >
          Table of Contents
        </p>
        <ol className="space-y-2">
          {items.map((item, idx) => (
            <li key={item.id}>
              <button
                onClick={() => onClick(item.id)}
                className="text-left w-full transition"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: active === item.id ? '#2D5A27' : '#374151',
                  fontWeight: active === item.id ? 600 : 400,
                  opacity: active === item.id ? 1 : 0.85,
                }}
              >
                {idx + 1}. {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
