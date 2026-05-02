// Badge Component for Habimint
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'bestseller' | 'sale';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'new',
  className 
}) => {
  const variantStyles = {
    new: 'bg-habimint-accent-green text-habimint-white',
    bestseller: 'bg-habimint-accent text-habimint-white',
    sale: 'bg-red-500 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};