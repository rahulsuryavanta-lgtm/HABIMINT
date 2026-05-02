// Pure HTML/CSS Logo Component for Habimint
'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  linkTo?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ linkTo = '/', showTagline = true }) => {
  const LogoContent = (
    <div className="logo-container" style={{ backgroundColor: 'transparent' }}>
      {/* Row 1: HABMINT text with pen */}
      <div className="logo-text-row" style={{ display: 'flex', alignItems: 'center', height: '42px' }}>
        <span style={{ 
          color: '#C8DEC8', 
          fontWeight: 900, 
          fontSize: '28px', 
          letterSpacing: '-1px', 
          fontFamily: "'Arial Black', sans-serif",
          lineHeight: '42px'
        }}>
          HAB
        </span>
        
        {/* Pen icon SVG inline */}
        <svg width="18" height="42" viewBox="0 0 18 42" style={{ margin: '0 1px', verticalAlign: 'middle' }}>
          <rect x="4" y="0" width="10" height="10" rx="5" fill="#6DC56D"/>
          <rect x="5" y="10" width="8" height="24" fill="#C084C8"/>
          <polygon points="5,34 13,34 9,42" fill="#9B6AAA"/>
        </svg>
        
        <span style={{ 
          color: '#C8DEC8', 
          fontWeight: 900, 
          fontSize: '28px', 
          letterSpacing: '-1px', 
          fontFamily: "'Arial Black', sans-serif",
          lineHeight: '42px'
        }}>
          MINT
        </span>
      </div>
      
      {/* Row 2: Purple brushstroke SVG */}
      <svg width="160" height="8" viewBox="0 0 160 8" style={{ display: 'block', marginTop: '-4px' }}>
        <path d="M10,5 C40,1 80,7 120,4 C140,2 155,6 160,4" 
          stroke="#C084C8" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </svg>
      
      {/* Row 3: Tagline */}
      {showTagline && (
        <div style={{ 
          color: '#C8DEC8', 
          fontSize: '9px', 
          letterSpacing: '0.25em', 
          fontFamily: 'Poppins, sans-serif', 
          marginTop: '2px',
          textTransform: 'uppercase'
        }}>
          From Aham to Ananta
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo}>
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};