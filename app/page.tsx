// Homepage for Habimint
'use client';

import { Hero } from '@/components/sections/Hero';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { Testimonials } from '@/components/sections/Testimonials';
import { B2BTeaser } from '@/components/sections/B2BTeaser';
import { Newsletter } from '@/components/sections/Newsletter';

export default function HomePage() {
  // TODO: Fetch data from API when backend is ready
  
  return (
    <div className="overflow-hidden">
      <Hero />
      <FeaturedProducts />
      <VideoShowcase />
      <Testimonials />
      <B2BTeaser />
      <Newsletter />
    </div>
  );
}