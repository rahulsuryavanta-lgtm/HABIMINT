// Site constants and configuration for Habimint

import { Testimonial } from './types';

export const SITE_CONFIG = {
  name: 'Habimint',
  slogan: 'From Aham to Ananta',
  description: 'Premium Indian wellness and self-growth journals',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  email: 'hello@habimint.com',
  phone: '+91 XXXX XXXXXX',
  social: {
    instagram: 'https://instagram.com/habimint',
    youtube: 'https://youtube.com/@habimint',
  },
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'B2B', href: '/b2b' },
  { name: 'Blogs', href: '/blogs' },
];

export const FOOTER_LINKS = {
  shop: [
    { name: 'Fall Forward', href: '/products/fall-forward' },
    { name: 'Version 2.0', href: '/products/version-2-0' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'B2B', href: '/b2b' },
    { name: 'Blogs', href: '/blogs' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/about#contact' },
    { name: 'Shipping', href: '/faq#shipping' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
};

export const PRODUCT_SLUGS = {
  FALL_FORWARD: 'fall-forward',
  VERSION_2_0: 'version-2-0',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Tanmay Kumar Sani',
    title: 'Photographer',
    rating: 5,
    content:
      'Fall Forward completely changed how I start my mornings. The daily reflection pages pushed me to be more intentional about my goals.',
    productSlug: 'fall-forward',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    title: 'Marketing Manager',
    rating: 5,
    content:
      "I've tried 6 different journals. Nothing comes close to Fall Forward. The artwork inside is stunning and the structure actually works.",
    productSlug: 'fall-forward',
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    title: 'Startup Founder',
    rating: 5,
    content:
      "Version 2.0 is intense in the best way. 21 days and I broke 2 bad habits I'd carried for years.",
    productSlug: 'version-2-0',
  },
  {
    id: '4',
    name: 'Ananya Singh',
    title: 'Medical Student',
    rating: 5,
    content:
      'The monthly budget pages combined with habit tracking is genius. Finally a journal that understands real life.',
    productSlug: 'fall-forward',
  },
  {
    id: '5',
    name: 'Vikram Nair',
    title: 'Corporate Trainer',
    rating: 5,
    content:
      'We ordered 50 copies of Fall Forward for our team wellness program. The response was overwhelming. Already planning the next order.',
    productSlug: 'fall-forward',
  },
];

export const BRAND_COLORS = {
  primary: '#2D5A27',
  primaryLight: '#C8DEC8',
  accent: '#C084C8',
  accentGreen: '#6DC56D',
  bg: '#F5F2E8',
  bgSecondary: '#EAE5D8',
  dark: '#1E2A3A',
  text: '#1A1A1A',
  textLight: '#6B7280',
  white: '#FFFFFF',
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
};