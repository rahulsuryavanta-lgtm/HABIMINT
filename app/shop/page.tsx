'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Metadata } from 'next';

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'journals' | 'new'>('all');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const products = [
    {
      id: 'fall-forward',
      slug: 'fall-forward',
      name: 'Fall Forward',
      tagline: 'Your 4-Month Transformation Journey',
      description: '316 pages of structured daily reflection, habit tracking, monthly planning and 4 exclusive artworks by Persian & Indian artists.',
      price: 749,
      originalPrice: 1299,
      discount: 550,
      image: '/images/fall-forward-hero.jpg',
      badge: 'BESTSELLER',
      badgeColor: 'bg-habimint-primary',
      isNew: false,
    },
    {
      id: 'version-2-0',
      slug: 'version-2-0',
      name: 'Version 2.0',
      tagline: 'Your 21-Day Guide to Becoming Unstoppable',
      description: '21 days of intense habit tracking across 6 life dimensions — Spiritual, Mental, Physical, Economic, Emotional, General.',
      price: 249,
      originalPrice: 599,
      discount: 350,
      image: '/images/version2-hero.jpg',
      badge: 'NEW',
      badgeColor: 'bg-habimint-accent',
      isNew: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'journals') return true; // All products are journals
    if (activeFilter === 'new') return product.isNew;
    return true;
  });

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    try {
      // TODO: Connect to actual API
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      // Show success feedback (could use a toast notification)
      setTimeout(() => setAddingToCart(null), 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(null);
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Shop Premium Journals | Habimint — Fall Forward & Version 2.0</title>
        <meta
          name="description"
          content="Shop Habimint's premium wellness journals. Fall Forward (4-month planner) and Version 2.0 (21-day guide) designed to transform your habits and mindset."
        />
        <meta name="keywords" content="buy journal, wellness journal, habit tracker, self-growth journal, Fall Forward journal, Version 2.0 journal, Indian wellness" />
        <meta property="og:title" content="Shop Premium Journals | Habimint" />
        <meta property="og:description" content="Shop Habimint's premium wellness journals. Fall Forward (4-month planner) and Version 2.0 (21-day guide)." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://habimint.com/shop" />
      </head>

      {/* Hero Banner */}
      <section className="bg-habimint-primary pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-habimint-primary-light text-sm tracking-widest uppercase mb-3">
              FROM AHAM TO ANANTA
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              Our Journals
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Find your perfect growth companion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-habimint-primary text-white'
                  : 'bg-gray-100 text-habimint-text hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('journals')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === 'journals'
                  ? 'bg-habimint-primary text-white'
                  : 'bg-gray-100 text-habimint-text hover:bg-gray-200'
              }`}
            >
              Journals
            </button>
            <button
              onClick={() => setActiveFilter('new')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === 'new'
                  ? 'bg-habimint-primary text-white'
                  : 'bg-gray-100 text-habimint-text hover:bg-gray-200'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-habimint-bg py-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-habimint-text-light text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${product.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                        {product.badge}
                      </span>
                    </div>
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-habimint-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                      {product.name}
                    </h3>
                    <p className="text-habimint-text-light text-sm mb-3">{product.tagline}</p>
                    <p className="text-habimint-text-light text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-habimint-primary text-2xl font-bold">₹{product.price}</span>
                      <span className="text-gray-400 line-through text-base">₹{product.originalPrice}</span>
                      <span className="bg-habimint-primary-light text-habimint-primary text-xs px-2 py-1 rounded">
                        Save ₹{product.discount}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={addingToCart === product.id}
                        className={`flex-1 bg-habimint-primary text-white py-3 rounded-full font-semibold transition ${
                          addingToCart === product.id
                            ? 'bg-opacity-70 cursor-wait'
                            : 'hover:bg-opacity-90'
                        }`}
                      >
                        {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                      </button>
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <button className="w-full border-2 border-habimint-primary text-habimint-primary py-3 rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-habimint-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Get notified about new journal launches, exclusive offers, and mindfulness tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-2 border-white bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
              />
              <button className="px-8 py-3 bg-white text-habimint-primary font-semibold rounded-full hover:bg-white/90 transition">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
