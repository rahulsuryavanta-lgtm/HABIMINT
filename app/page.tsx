// Habimint Homepage - World-Class Premium
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Truck, Star, Package, Lock, Volume2, VolumeX } from 'lucide-react';
import useToast from '@/utils/useToast';
import { useDispatch } from 'react-redux';
import { fetchHomePageApi } from '@/stores/homePageSlice';


export default function HomePage() {
  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Video mute state — must start muted so browsers allow autoplay
  const [isMuted, setIsMuted] = useState(true);
  const { Error, Success } = useToast();

  // Touch swipe support for hero slider
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % 3);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const heroSlides = [
    {
      id: 1,
      image: '/images/fall-forward-hero.jpg',
      label: 'FALL FORWARD — 4 MONTH JOURNAL',
      heading: ['Plan with Intention.', 'Live with Purpose.'],
      subtext: 'The premium journal that transforms your habits, mindset and life.',
      primaryButton: { text: 'Shop Now →', href: '/shop' },
      secondaryButton: { text: 'Our Story', href: '/about' },
    },
    {
      id: 2,
      image: '/images/fall-forward-window.jpg',
      label: 'FROM AHAM TO ANANTA',
      heading: ['Fall Forward.', 'Rise Unlimited.'],
      subtext: '316 pages. 4 months. One complete transformation.',
      primaryButton: { text: 'Shop Fall Forward →', href: '/shop' },
      secondaryButton: { text: 'Learn More', href: '/about' },
    },
    {
      id: 3,
      image: '/images/version2-hero.jpg',
      label: 'VERSION 2.0 — 21 DAY GUIDE',
      heading: ['21 Days.', 'Become Unstoppable.'],
      subtext: "Track 6 dimensions of growth daily. It's always you vs you.",
      primaryButton: { text: 'Shop Version 2.0 →', href: '/shop' },
      secondaryButton: { text: 'See Inside', href: '#inside' },
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Newsletter form state
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('idle');
    try {
      // TODO: Connect to actual API
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      setNewsletterStatus('success');
      setEmail('');
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  const dispatch = useDispatch();
  const callDashboardApi = async () => {
    await dispatch(fetchHomePageApi({}));
  };

  useEffect(() => {
    callDashboardApi();
  }, []);


  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Habimint',
            description: 'Premium wellness and self-growth journals from India',
            url: 'https://habimint.com',
            slogan: 'From Aham to Ananta',
          }),
        }}
      />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO (Nike.com level) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-screen overflow-hidden h-screen md:h-screen habimint-hero"
        style={{ margin: 0, padding: 0 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Hero Slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => {
            // Use a key from the image filename so CSS can target the correct mobile object-position per image
            const imgKey = slide.image.split('/').pop()?.split('.')[0] || '';
            return (
              <div
                key={slide.id}
                className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  quality={95}
                  sizes="100vw"
                  priority={index === 0}
                  className="hero-slide-img"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                  data-img={imgKey}
                />

                {/* Dark Gradient Overlay — softer at top so journal cover is fully visible on mobile */}
                <div
                  className="absolute inset-0 z-[1] hero-slide-overlay"
                />
              </div>
            );
          })}
        </div>

        {/* Slide Content */}
        <div
          className="absolute left-0 right-0 z-[2] text-center px-5 md:px-6"
          style={{ bottom: 'clamp(100px, 12vh, 120px)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.6 }}
                className="text-habimint-accent-green uppercase mb-3 md:mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.15em' }}
              >
                {heroSlides[currentSlide].label}
              </motion.p>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mb-3 md:mb-4"
              >
                {heroSlides[currentSlide].heading.map((line, i) => (
                  <h1
                    key={i}
                    className="font-heading font-bold text-white text-[34px] md:text-7xl"
                    style={{ lineHeight: 1.2 }}
                  >
                    {line}
                  </h1>
                ))}
              </motion.div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/90 text-[14px] md:text-lg mb-5 md:mb-6 max-w-2xl mx-auto"
                style={{ lineHeight: 1.6 }}
              >
                {heroSlides[currentSlide].subtext}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              >
                <Link href={heroSlides[currentSlide].primaryButton.href} className="w-[85%] sm:w-auto block">
                  <button
                    className="w-full sm:w-auto bg-white text-habimint-text font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 px-6 md:px-8 py-[14px] md:py-3 text-[15px] md:text-base"
                  >
                    {heroSlides[currentSlide].primaryButton.text}
                  </button>
                </Link>
                <Link href={heroSlides[currentSlide].secondaryButton.href} className="w-[85%] sm:w-auto block">
                  <button
                    className="w-full sm:w-auto bg-transparent text-white border-2 border-white font-semibold rounded-full hover:bg-white hover:text-habimint-text transition-all duration-300 hover:scale-105 px-6 md:px-8 py-[14px] md:py-3 text-[15px] md:text-base"
                  >
                    {heroSlides[currentSlide].secondaryButton.text}
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Content */}
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — TRUST BAR */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-bg border-t border-b border-[#E5E0D5] py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-habimint-primary" />
              <span className="text-habimint-primary text-sm font-medium">Free Delivery above ₹1,499</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-habimint-primary fill-habimint-primary" />
              <span className="text-habimint-primary text-sm font-medium">4.8★ Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-habimint-primary" />
              <span className="text-habimint-primary text-sm font-medium">500+ Journals Sold</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-habimint-primary" />
              <span className="text-habimint-primary text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — FEATURED PRODUCTS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-bg py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-habimint-text mb-4">Our Journals</h2>
            <p className="text-habimint-text-light text-lg">
              Crafted for those who choose to grow intentionally
            </p>
            {/* Purple brushstroke accent */}
            <svg width="200" height="8" viewBox="0 0 200 8" className="mx-auto mt-4">
              <path d="M10,5 C40,1 80,7 120,4 C140,2 175,6 190,4" stroke="#C084C8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* PRODUCT CARD 1 — FALL FORWARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden group">
                <Image
                  src="/images/fall-forward-hero.jpg"
                  alt="Fall Forward Journal"
                  fill
                  quality={90}
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-habimint-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                    BESTSELLER
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-habimint-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                    42% OFF
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">Fall Forward</h3>
                <p className="text-habimint-text-light text-sm mb-3">Your 4-Month Transformation Journey</p>
                <p className="text-habimint-text-light text-sm mb-4 leading-relaxed">
                  316 pages of structured daily reflection, habit tracking, monthly planning and 4 exclusive artworks by Persian & Indian artists.
                </p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-habimint-primary text-2xl font-bold">₹749</span>
                  <span className="text-gray-400 line-through text-base">₹1,299</span>
                  <span className="bg-habimint-primary-light text-habimint-primary text-xs px-2 py-1 rounded">
                    Save ₹550
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                    Add to Cart
                  </button>
                  <Link href="/products/fall-forward" className="flex-1">
                    <button className="w-full border-2 border-habimint-primary text-habimint-primary py-3 rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* PRODUCT CARD 2 — VERSION 2.0 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden group">
                <Image
                  src="/images/version2-hero.jpg"
                  alt="Version 2.0 Journal"
                  fill
                  quality={90}
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-habimint-accent text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-habimint-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                    58% OFF
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">Version 2.0</h3>
                <p className="text-habimint-text-light text-sm mb-3">Your 21-Day Guide to Becoming Unstoppable</p>
                <p className="text-habimint-text-light text-sm mb-4 leading-relaxed">
                  21 days of intense habit tracking across 6 life dimensions — Spiritual, Mental, Physical, Economic, Emotional, General.
                </p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-habimint-primary text-2xl font-bold">₹249</span>
                  <span className="text-gray-400 line-through text-base">₹599</span>
                  <span className="bg-habimint-primary-light text-habimint-primary text-xs px-2 py-1 rounded">
                    Save ₹350
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                    Add to Cart
                  </button>
                  <Link href="/products/version-2-0" className="flex-1">
                    <button className="w-full border-2 border-habimint-primary text-habimint-primary py-3 rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3.5 — WHY FALL FORWARD */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[60px]" style={{ backgroundColor: '#F5F2E8' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center px-4"
          style={{ marginBottom: '40px' }}
        >
          <h2
            className="font-heading text-[32px] md:text-[40px] leading-tight"
            style={{ color: '#1A1A1A' }}
          >
            Why Fall Forward?
          </h2>
          <p
            className="mt-3 text-sm md:text-base"
            style={{ color: '#6B7280', fontFamily: 'Poppins, sans-serif' }}
          >
            Everything you need for your transformation journey
          </p>
        </motion.div>

        {/* Banners — DESKTOP ONLY (hidden on mobile) */}
        <div className="hidden md:flex flex-col w-full">
          {[
            { src: '/images/hero-slide-1.jpg', delay: 0 },
            { src: '/images/hero-slide-2.jpg', delay: 0.2 },
            { src: '/images/hero-slide-3.jpg', delay: 0.4 },
          ].map((banner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: banner.delay, ease: 'easeOut' }}
              whileHover={{ scale: 1.01 }}
              className="w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300"
              style={{
                marginBottom: '24px',
                backgroundColor: '#F5F2E8',
              }}
              onClick={() => (window.location.href = '/products/fall-forward')}
            >
              <Link href="/products/fall-forward" className="block w-full">
                <img
                  src={banner.src}
                  alt={`Why Fall Forward banner ${idx + 1}`}
                  className="block w-full h-[50vh] md:h-[70vh]"
                  style={{ objectFit: 'cover', display: 'block' }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MOBILE ALTERNATIVE — clean product preview */}
        <div className="md:hidden px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {/* Two product images side by side */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link href="/products/fall-forward" className="block">
                <div className="relative w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src="/images/fall-forward-cover.jpg"
                    alt="Fall Forward — Cover"
                    className="w-full h-full"
                    style={{ objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </Link>
              <Link href="/products/fall-forward" className="block">
                <div className="relative w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src="/images/fall-forward-inside.jpg"
                    alt="Fall Forward — Inside"
                    className="w-full h-full"
                    style={{ objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </Link>
            </div>

            {/* Bullet points */}
            <ul className="space-y-3 mb-6">
              {[
                '316 pages of guided daily reflection',
                '4 exclusive artworks inside',
                'Monthly planning + budget tracking',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#374151', lineHeight: 1.6 }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-full shrink-0"
                    style={{ width: 22, height: 22, backgroundColor: '#2D5A27', marginTop: 2 }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="/products/fall-forward"
              className="flex items-center justify-center w-full rounded-full text-white font-semibold transition hover:brightness-110 min-h-[48px]"
              style={{
                backgroundColor: '#2D5A27',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                padding: '12px 24px',
              }}
            >
              Shop Fall Forward →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — PHILOSOPHY STRIP */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-heading text-3xl md:text-5xl text-white italic mb-4 leading-tight">
              "If you're going to fall — Fall Forward."
            </p>
            <p className="text-habimint-primary-light text-sm">— The philosophy behind every Habimint journal</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — VIDEO SHOWCASE */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-bg py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-habimint-accent-green text-xs tracking-widest uppercase mb-4">FALL FORWARD</p>
              <h2 className="font-heading text-4xl font-bold text-habimint-text mb-4">
                More than a journal.
                <br />A daily guide.
              </h2>
              <p className="text-habimint-text-light mb-6 leading-relaxed">
                Every page of Fall Forward was designed with intention. From your morning affirmation to your evening reflection — each prompt pushes you one step closer to who you're becoming.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-habimint-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-habimint-accent-green" />
                  </div>
                  <p className="text-habimint-text">Structured daily pages — morning + evening reflection</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-habimint-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-habimint-accent-green" />
                  </div>
                  <p className="text-habimint-text">Monthly planning, budgeting & goal tracking</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-habimint-accent-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-habimint-accent-green" />
                  </div>
                  <p className="text-habimint-text">4 exclusive artworks by Persian & Indian artists</p>
                </div>
              </div>
              <Link href="/shop">
                <button className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                  Explore Fall Forward →
                </button>
              </Link>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <video
                  ref={(el) => {
                    if (el) {
                      el.muted = isMuted;
                      const p = el.play();
                      if (p && typeof p.catch === 'function') {
                        p.catch(() => {
                          el.muted = true;
                          el.play().catch(() => { });
                        });
                      }
                    }
                  }}
                  poster="/images/fall-forward-open.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                  key="ff-reel-h264-v2"
                  style={{
                    width: '260px',
                    aspectRatio: '9/16',
                    objectFit: 'cover',
                    borderRadius: '24px',
                    border: '4px solid #1a1a1a',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                  }}
                  onError={(e) => {
                    // Fallback to image if video fails to load
                    const img = document.createElement('img');
                    img.src = '/images/fall-forward-open.jpg';
                    img.style.width = '260px';
                    img.style.aspectRatio = '9/16';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '24px';
                    img.style.border = '4px solid #1a1a1a';
                    img.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                    e.currentTarget.parentNode?.replaceChild(img, e.currentTarget);
                  }}
                >
                  <source src="/videos/fall-forward-reel.mp4?v=h264" type="video/mp4; codecs=avc1.4d401f,mp4a.40.2" />
                  <source src="/videos/fall-forward-reel.mp4?v=h264" type="video/mp4" />
                </video>
                {/* Mute/Unmute Button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 flex items-center justify-center transition-all z-10"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold text-habimint-text text-center mb-16"
          >
            Your Journey in 4 Steps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: 1, emoji: '🌅', title: 'Start Your Morning', desc: 'Daily affirmation and intention setting to focus your mind' },
              { number: 2, emoji: '✅', title: 'Track Your Habits', desc: 'Monitor 6 dimensions of personal growth every single day' },
              { number: 3, emoji: '📊', title: 'Reflect Every Week', desc: 'Honest review of your wins, lessons and next steps' },
              { number: 4, emoji: '🌟', title: 'Transform Monthly', desc: 'Plan goals, track budget, celebrate your growth' },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-habimint-primary text-white font-bold text-xl mb-4">
                  {step.number}
                </div>
                <div className="text-4xl mb-3">{step.emoji}</div>
                <h3 className="font-heading text-xl font-semibold text-habimint-text mb-2">{step.title}</h3>
                <p className="text-habimint-text-light text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — INSIDE THE JOURNAL */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="inside" className="bg-habimint-bg py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
          >
            What's Inside Fall Forward
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { image: '/images/fall-forward-art-1.jpg', title: 'Before the Surface', subtitle: 'Month 1 Artwork' },
              { image: '/images/fall-forward-art-2.jpg', title: 'All That I Am', subtitle: 'Month 3 — By Vignesh' },
              { image: '/images/fall-forward-inside.jpg', title: 'Daily Pages', subtitle: 'Morning + Evening' },
              { image: '/images/fall-forward-open.jpg', title: 'Monthly Planning', subtitle: 'Budget + Goals' },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    quality={90}
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-habimint-text mb-1">{card.title}</h3>
                <p className="text-habimint-text-light text-sm">{card.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 8 — TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-bold text-habimint-text mb-3">What Our Community Says</h2>
            <p className="text-habimint-text-light">Real journals. Real people. Real transformation.</p>
          </motion.div>

          <div className="overflow-x-auto pb-8">
            <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
              {[
                { text: "Fall Forward completely changed how I start my mornings. The daily reflection pages pushed me to be more intentional about my goals. I've tried many journals — this one actually works.", name: 'Tanmay Kumar Sani', title: 'Photographer' },
                { text: "I've tried 6 different journals. Nothing comes close to Fall Forward. The artwork inside is stunning and the structure actually guides you — it doesn't just give you blank pages.", name: 'Priya Sharma', title: 'Marketing Manager, Mumbai' },
                { text: "Version 2.0 is intense in the best way. 21 days and I broke 2 bad habits I'd been carrying for years. The daily scoring system keeps you brutally honest.", name: 'Rohan Mehta', title: 'Startup Founder, Bangalore' },
                { text: "The monthly budget pages combined with habit tracking is something I've never seen in any journal. Finally something that understands real life.", name: 'Ananya Singh', title: 'Medical Student, Delhi' },
                { text: 'We ordered 50 copies of Fall Forward for our team wellness program. The response was overwhelming. Already planning the next bulk order.', name: 'Vikram Nair', title: 'Corporate Trainer, Pune' },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-habimint-bg rounded-2xl p-6 min-w-[320px] max-w-[400px] flex-shrink-0"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">{testimonial.text}</p>
                  <div>
                    <p className="font-bold text-habimint-text text-sm">{testimonial.name}</p>
                    <p className="text-habimint-text-light text-xs">{testimonial.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 9 — B2B TEASER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-habimint-primary text-white text-xs px-3 py-1 rounded-full font-medium inline-block mb-4">
                FOR BUSINESSES
              </span>
              <h2 className="font-heading text-4xl font-bold text-habimint-text mb-4">
                Elevate Your Team.
                <br />
                Gift Growth.
              </h2>
              <p className="text-habimint-text-light mb-6 leading-relaxed">
                From corporate gifting to employee wellness programs — Habimint journals are the most meaningful gift you can give your team. Custom branding available.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  <span className="text-habimint-text text-sm">Corporate Gifting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💼</span>
                  <span className="text-habimint-text text-sm">Employee Wellness</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <span className="text-habimint-text text-sm">Universities & Colleges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏫</span>
                  <span className="text-habimint-text text-sm">Schools & Institutions</span>
                </div>
              </div>
              <Link href="/b2b">
                <button className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition mb-3">
                  Enquire for Bulk Orders →
                </button>
              </Link>
              <p className="text-habimint-text-light text-xs">Minimum 20 units · Custom branding available</p>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/fall-forward-banner.jpg"
                  alt="Fall Forward Banner"
                  width={500}
                  height={300}
                  quality={90}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 10 — NEWSLETTER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-habimint-dark py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-habimint-primary-light text-xs tracking-widest uppercase mb-4">JOIN THE JOURNEY</p>
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Get 10% Off Your First Order</h2>
            <p className="text-habimint-primary-light mb-8">
              Plus weekly insights on habits, growth and intentional living. No spam — ever.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-80 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-habimint-primary"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition"
              >
                Subscribe
              </button>
            </form>

            {newsletterStatus === 'success' && (
              <p className="text-habimint-accent-green text-sm mb-4">✓ Successfully subscribed! Check your inbox.</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="text-red-400 text-sm mb-4">Something went wrong. Please try again.</p>
            )}

            <p className="text-habimint-primary-light text-sm">
              Join 2,000+ people on the journey from Aham to Ananta
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
