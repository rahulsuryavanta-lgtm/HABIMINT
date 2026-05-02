// Nike-level Hero Section Component for Habimint
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '../ui/Button';

interface Slide {
  id: number;
  image: string;
  label: string;
  heading: string[];
  subtext: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://i.ibb.co/SD5jZq82/hero-slide-1.png',
    label: 'FALL FORWARD — 4 MONTH JOURNAL',
    heading: ['Plan with Intention.', 'Live with Purpose.'],
    subtext: 'The journal that transforms your habits, mindset and life.',
    primaryButton: { text: 'Shop Now →', href: '/shop' },
    secondaryButton: { text: 'Watch ▶', href: '#video' },
  },
  {
    id: 2,
    image: 'https://i.ibb.co/MDxj2hNp/hero-slide-2.png',
    label: 'FROM AHAM TO ANANTA',
    heading: ['Fall Forward.', 'Rise Unlimited.'],
    subtext: 'Transform from self-awareness to limitless potential.',
    primaryButton: { text: 'Shop Fall Forward →', href: '/products/fall-forward' },
    secondaryButton: { text: 'Learn More', href: '/about' },
  },
  {
    id: 3,
    image: 'https://i.ibb.co/bMsz0T9N/hero-slide-3.png',
    label: 'VERSION 2.0 — 21 DAY GUIDE',
    heading: ['21 Days.', 'Become Unstoppable.'],
    subtext: 'Break old patterns. Build empowering habits.',
    primaryButton: { text: 'Shop Version 2.0 →', href: '/products/version-2-0' },
    secondaryButton: { text: 'See Inside', href: '#preview' },
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 animate-kenburns">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.label}
                fill
                priority
                quality={100}
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.7) 100%)'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content */}
      <div className="absolute inset-x-0 bottom-0 pb-20 md:pb-24 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="flex flex-col items-center text-center"
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                className="text-habimint-accent-green text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 md:mb-6"
              >
                {currentSlideData.label}
              </motion.p>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 md:mb-6"
              >
                {currentSlideData.heading.map((line, index) => (
                  <h1
                    key={index}
                    className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  >
                    {line}
                  </h1>
                ))}
              </motion.div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/90 text-base md:text-xl mb-6 md:mb-8 max-w-2xl"
              >
                {currentSlideData.subtext}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href={currentSlideData.primaryButton.href}>
                  <button className="px-8 py-4 bg-white text-habimint-text font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg text-base md:text-lg">
                    {currentSlideData.primaryButton.text}
                  </button>
                </a>
                <a href={currentSlideData.secondaryButton.href}>
                  <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-habimint-text transition-all duration-300 hover:scale-105 text-base md:text-lg">
                    {currentSlideData.secondaryButton.text}
                  </button>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 z-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Dot Indicators */}
          <div className="flex gap-3 items-center justify-center flex-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-10 h-3 bg-white'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Controls + Play/Pause */}
          <div className="flex gap-3 items-center">
            {/* Previous */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Next */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              ) : (
                <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Ken Burns CSS Animation */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
        
        .animate-kenburns {
          animation: kenburns 5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};