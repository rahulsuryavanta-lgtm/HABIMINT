// Featured Products Section Component for Habimint
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Product } from '@/lib/types';

interface FeaturedProductsProps {
  products?: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products = [] }) => {
  // TODO: Fetch featured products from API when backend is ready
  // Mock data for now
  const mockProducts: Product[] = products.length > 0 ? products : [
    {
      id: '1',
      slug: 'fall-forward',
      name: 'Fall Forward',
      description: 'A comprehensive 90-day journal designed to help you embrace challenges and turn them into opportunities for growth.',
      shortDescription: '90-day transformational journal for personal growth',
      price: 599,
      originalPrice: 799,
      images: ['/products/fall-forward.jpg'],
      category: 'journals',
      inStock: true,
      badge: 'Bestseller',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      slug: 'version-2-0',
      name: 'Version 2.0',
      description: 'An intensive 21-day habit transformation program to help you break old patterns and build new empowering habits.',
      shortDescription: '21-day intensive habit transformation program',
      price: 399,
      originalPrice: 499,
      images: ['/products/version-2-0.jpg'],
      category: 'journals',
      inStock: true,
      badge: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Journals"
          subtitle="Discover our premium collection designed to transform your daily practice"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};