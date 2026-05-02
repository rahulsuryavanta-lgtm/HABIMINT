// Habimint Logo Component - SVG
'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
  showTagline?: boolean;
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'default',
  showTagline = true,
  linkTo = '/'
}) => {
  // Color variants
  const textColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#1A1A1A' : '#C8DEC8';
  const taglineColor = variant === 'white' ? '#C8DEC8' : variant === 'dark' ? '#6B7280' : '#6B7280';
  
  const LogoSVG = (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: 'auto' }}
    >
      {/* Main Logo Text: HAB */}
      <text
        x="0"
        y="45"
        fontSize="48"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill={textColor}
        letterSpacing="4"
      >
        HAB
      </text>

      {/* Pen Icon - Replacing the "I" */}
      <g transform="translate(95, 10)">
        {/* Pen Cap - Green */}
        <ellipse
          cx="10"
          cy="8"
          rx="7"
          ry="4"
          fill="#6DC56D"
        />
        <rect
          x="3"
          y="8"
          width="14"
          height="6"
          fill="#6DC56D"
          rx="2"
        />
        
        {/* Pen Barrel - Purple/Pink */}
        <rect
          x="4"
          y="14"
          width="12"
          height="26"
          fill="#C084C8"
          rx="2"
        />
        
        {/* Pen Clip */}
        <rect
          x="15"
          y="16"
          width="2"
          height="10"
          fill="#6DC56D"
          rx="1"
        />
        
        {/* Pen Tip Section */}
        <polygon
          points="4,40 10,48 16,40"
          fill="#9B6BA8"
        />
        
        {/* Pen Tip */}
        <polygon
          points="9,48 10,52 11,48"
          fill="#1A1A1A"
        />
        
        {/* Shine effect on barrel */}
        <rect
          x="6"
          y="16"
          width="2"
          height="20"
          fill="#FFFFFF"
          opacity="0.3"
          rx="1"
        />
      </g>

      {/* Main Logo Text: MINT */}
      <text
        x="125"
        y="45"
        fontSize="48"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill={textColor}
        letterSpacing="4"
      >
        MINT
      </text>

      {/* Brushstroke Underline - Hand-painted style */}
      <path
        d="M 5 55 Q 10 50, 40 52 T 80 54 T 120 53 T 160 52 T 200 53 T 240 54 Q 260 55, 265 56"
        stroke="#C084C8"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      
      {/* Additional brushstroke layer for thickness variation */}
      <path
        d="M 40 53 Q 80 51, 120 52 T 200 53 Q 220 54, 230 54"
        stroke="#C084C8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Tagline: FROM AHAM TO ANANTA */}
      {showTagline && (
        <text
          x="135"
          y="72"
          fontSize="9"
          fontWeight="500"
          fontFamily="'Poppins', sans-serif"
          fill={taglineColor}
          letterSpacing="3"
          textAnchor="middle"
        >
          FROM AHAM TO ANANTA
        </text>
      )}
    </svg>
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

// Compact version for favicons and small displays
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
        x="15"
        y="55"
        fontSize="28"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill="#C8DEC8"
        letterSpacing="1"
      >
        HAB
      </text>

      {/* Pen Icon - Centered */}
      <g transform="translate(50, 28)">
        <ellipse cx="10" cy="6" rx="6" ry="3" fill="#6DC56D" />
        <rect x="4" y="6" width="12" height="5" fill="#6DC56D" rx="2" />
        <rect x="5" y="11" width="10" height="20" fill="#C084C8" rx="2" />
        <rect x="14" y="13" width="1.5" height="8" fill="#6DC56D" rx="0.75" />
        <polygon points="5,31 10,37 15,31" fill="#9B6BA8" />
        <polygon points="9,37 10,40 11,37" fill="#1A1A1A" />
        <rect x="6" y="13" width="1.5" height="15" fill="#FFFFFF" opacity="0.3" rx="0.75" />
      </g>

      {/* MINT */}
      <text
        x="15"
        y="90"
        fontSize="28"
        fontWeight="900"
        fontFamily="'Poppins', sans-serif"
        fill="#C8DEC8"
        letterSpacing="1"
      >
        MINT
      </text>

      {/* Brushstroke */}
      <path
        d="M 15 95 Q 40 93, 60 94 T 105 95"
        stroke="#C084C8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
};