// Habimint Logo Component - Rebuilt from scratch
'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  linkTo?: string;
  textColor?: string; // Custom text color
  taglineColor?: string; // Custom tagline color
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = true,
  linkTo = '/',
  textColor = '#1A3A1A',
  taglineColor = '#2D5A27'
}) => {
  const LogoSVG = (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {/* Main logo with text and pen */}
      <div className="flex items-end" style={{ height: '48px' }}>
        {/* HAB text */}
        <span 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '48px',
            fontWeight: 900,
            color: textColor,
            lineHeight: '48px',
            letterSpacing: '2px'
          }}
        >
          HAB
        </span>
        
        {/* Pen Icon - inline, same height as text */}
        <svg width="20" height="48" viewBox="0 0 20 48" fill="none" style={{ margin: '0 2px' }}>
          {/* Green cap */}
          <rect x="5" y="0" width="10" height="12" rx="3" fill="#6DC56D"/>
          {/* Purple body */}
          <rect x="5" y="12" width="10" height="28" fill="#C084C8"/>
          {/* Nib tip */}
          <polygon points="5,40 15,40 10,48" fill="#C084C8"/>
        </svg>
        
        {/* MINT text */}
        <span 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '48px',
            fontWeight: 900,
            color: textColor,
            lineHeight: '48px',
            letterSpacing: '2px'
          }}
        >
          MINT
        </span>
      </div>
      
      {/* Brushstroke underline */}
      <svg width="100%" height="8" viewBox="0 0 200 8" style={{ marginTop: '2px' }}>
        <path 
          d="M0,6 C30,2 60,8 100,5 C140,2 170,7 200,4" 
          stroke="#C084C8" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
        />
      </svg>
      
      {/* Tagline */}
      {showTagline && (
        <div 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: taglineColor,
            textTransform: 'uppercase',
            marginTop: '4px',
            fontWeight: 500
          }}
        >
          From Aham to Ananta
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="inline-block">
        {LogoSVG}
      </Link>
    );
  }

  return LogoSVG;
};

// Compact version for favicon
export const LogoCompact: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="120" height="120" fill="#2D5A27" rx="20" />
      
      {/* HAB */}
      <text
        x="60"
        y="50"
        fontSize="24"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill="#C8DEC8"
        textAnchor="middle"
        letterSpacing="1"
      >
        HAB
      </text>

      {/* Pen Icon - Centered */}
      <g transform="translate(55, 52)">
        <rect x="0" y="0" width="10" height="12" rx="3" fill="#6DC56D" />
        <rect x="0" y="12" width="10" height="20" fill="#C084C8" />
        <polygon points="0,32 10,32 5,38" fill="#C084C8" />
      </g>

      {/* MINT */}
      <text
        x="60"
        y="105"
        fontSize="24"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill="#C8DEC8"
        textAnchor="middle"
        letterSpacing="1"
      >
        MINT
      </text>

      {/* Brushstroke */}
      <path
        d="M 20 108 Q 40 106, 60 107 T 100 108"
        stroke="#C084C8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};