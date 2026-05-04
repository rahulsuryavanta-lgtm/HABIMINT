'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Minus, Plus, Share2, ShoppingCart, Truck, Lock, RotateCcw, Copy } from 'lucide-react';
import { notFound } from 'next/navigation';

// Static product data
const PRODUCTS = {
  'fall-forward': {
    id: 'fall-forward',
    slug: 'fall-forward',
    name: 'Fall Forward',
    tagline: 'Your 4-Month Transformation Journey',
    price: 749,
    originalPrice: 1299,
    badge: 'BESTSELLER',
    badgeColor: 'bg-habimint-primary',
    mainImage: '/images/fall-forward-hero.jpg',
    gallery: [
      '/images/fall-forward-hero.jpg',
      '/images/fall-forward-cover.jpg',
      '/images/fall-forward-open.jpg',
      '/images/fall-forward-inside.jpg',
      '/images/fall-forward-desk.jpg',
    ],
    description: "Fall Forward is not just a journal — it's a complete personal growth system. 316 pages meticulously designed to guide you through a 4-month transformation journey. Every page was crafted with intention — from your morning affirmation to your evening reflection. This journal doesn't just give you blank pages, it guides you with thoughtful prompts, habit trackers, and beautiful artwork that inspires growth at every turn.",
    features: [
      '316 premium pages',
      'Morning & evening daily pages',
      'Weekly reflection spreads',
      'Monthly planning & budget tracking',
      'Vision & goal setting pages',
      '4 exclusive artworks (Persian & Indian artists)',
      'Letter to Future Self (tearable page)',
      '157gsm cover, 80gsm inner pages',
      'Matt laminated case-bound cover',
      'Size: 22.5 × 16.5 × 2.5 cm',
    ],
    specifications: {
      'Pages': '316 pages',
      'Duration': '4 months (120 days)',
      'Cover': '157gsm matt laminated case-bound',
      'Inner Pages': '80gsm premium quality',
      'Binding': 'Case-bound (hardcover)',
      'Dimensions': '22.5 × 16.5 × 2.5 cm',
      'Weight': '650g',
      'Color': 'Deep Black',
      'Special Features': 'Letter to Future Self (tearable), 4 exclusive artworks',
    },
    insidePages: [
      { image: '/images/fall-forward-art-1.jpg', title: 'Before the Surface', subtitle: 'Month 1 Artwork' },
      { image: '/images/fall-forward-art-2.jpg', title: 'All That I Am', subtitle: 'Month 3 Artwork — By Vignesh' },
      { image: '/images/fall-forward-inside.jpg', title: 'Daily Pages', subtitle: 'Morning + Evening Reflection' },
      { image: '/images/fall-forward-open.jpg', title: 'Monthly Planning', subtitle: 'Budget + Goals Tracker' },
    ],
    rating: 4.8,
    reviewCount: 127,
  },
  'version-2-0': {
    id: 'version-2-0',
    slug: 'version-2-0',
    name: 'Version 2.0',
    tagline: 'Your 21-Day Guide to Becoming Unstoppable',
    price: 249,
    originalPrice: 599,
    badge: 'NEW',
    badgeColor: 'bg-habimint-accent',
    mainImage: '/images/version2-hero.jpg',
    gallery: [
      '/images/version2-hero.jpg',
      '/images/version2-cover.jpg',
      '/images/version2-open.jpg',
      '/images/version2-flat.jpg',
    ],
    description: "Version 2.0 is your 21-day intensive habit transformation guide. Track 6 dimensions of growth every single day — Spiritual, Mental, Physical, Economic, Emotional, General. This isn't your typical habit tracker. It's a complete system designed to help you become the best version of yourself in just 3 weeks. With daily scoring, bad habit resistance tracking, and powerful quotes, Version 2.0 pushes you to take massive action.",
    features: [
      '21-day structured program',
      '6 life dimensions tracked daily',
      'Daily scoring system (±6)',
      'Bad habit resistance tracker',
      'Weekly reflection pages',
      '21 powerful daily quotes',
      'Spiral bound for flat writing',
      'Premium quality paper',
    ],
    specifications: {
      'Duration': '21 days',
      'Dimensions Tracked': '6 (Spiritual, Mental, Physical, Economic, Emotional, General)',
      'Binding': 'Spiral bound',
      'Paper Quality': 'Premium 80gsm',
      'Size': '21 × 15 cm',
      'Weight': '200g',
      'Color': 'Deep Forest Green',
      'Special Features': 'Daily quotes, Bad habit tracker, Scoring system',
    },
    insidePages: [
      { image: '/images/version2-open.jpg', title: 'Daily Tracking Page', subtitle: '6 Dimensions Scorecard' },
      { image: '/images/version2-flat.jpg', title: 'Spiral Bound Design', subtitle: 'Lays flat for easy writing' },
    ],
    rating: 4.9,
    reviewCount: 83,
  },
};

const TESTIMONIALS = [
  {
    name: 'Tanmay Kumar Sani',
    role: 'Photographer',
    rating: 5,
    text: "Fall Forward completely changed how I start my mornings. The daily reflection pages pushed me to be more intentional about my goals. I have tried many journals — this one actually works.",
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager, Mumbai',
    rating: 5,
    text: "I have tried 6 different journals. Nothing comes close to Fall Forward. The artwork inside is stunning and the structure actually guides you — it does not just give you blank pages.",
  },
  {
    name: 'Arjun Mehta',
    role: 'Entrepreneur',
    rating: 5,
    text: 'Version 2.0 gave me the kick I needed. 21 days of tracking every dimension of my life made me realize where I was slacking. Game changer.',
  },
  {
    name: 'Neha Patel',
    role: 'Yoga Instructor',
    rating: 4,
    text: 'Beautiful design, thoughtful prompts, and high-quality paper. The habit tracking system is simple but effective. Highly recommend for anyone serious about growth.',
  },
  {
    name: 'Rohan Desai',
    role: 'Software Engineer',
    rating: 5,
    text: 'The best investment I made this year. Fall Forward helped me build consistency and track progress like never before. The monthly reflections are incredibly powerful.',
  },
];

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS[params.slug as keyof typeof PRODUCTS];

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'about' | 'inside' | 'specs' | 'reviews'>('about');
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      // TODO: Connect to actual API
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      setAddingToCart(false);
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Check out ${product.name} from Habimint!`;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const otherProduct = Object.values(PRODUCTS).find((p) => p.slug !== product.slug);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{product.name} — {product.tagline} | Habimint</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — ${product.tagline} | Habimint`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="INR" />
        <link rel="canonical" href={`https://habimint.com/products/${product.slug}`} />
      </head>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.mainImage,
            sku: product.id,
            brand: {
              '@type': 'Brand',
              name: 'Habimint',
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              url: `https://habimint.com/products/${product.slug}`,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />

      <main className="bg-white pt-24 pb-20">
        {/* TOP SECTION - Product Details */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* LEFT - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div
                className="relative w-full overflow-hidden rounded-2xl mb-4 flex items-center justify-center min-h-[300px] max-h-[400px] md:min-h-[500px] md:max-h-[600px]"
                style={{ backgroundColor: '#F5F2E8' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={product.gallery[selectedImage]}
                      alt={product.name}
                      width={600}
                      height={600}
                      quality={95}
                      priority
                      className="w-full h-full"
                      style={{
                        objectFit: 'contain',
                        maxHeight: '580px',
                        padding: '16px',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnail Gallery — horizontal scroll row */}
              <div
                className="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-1 px-1"
                style={{
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="relative shrink-0 rounded-lg overflow-hidden transition-all flex items-center justify-center w-[65px] h-[80px] md:w-[80px] md:h-[100px]"
                    style={{
                      backgroundColor: '#F5F2E8',
                      border:
                        selectedImage === index
                          ? '2px solid #2D5A27'
                          : '2px solid #E5E0D5',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedImage !== index) {
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #C8DEC8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedImage !== index) {
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #E5E0D5';
                      }
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={100}
                      height={120}
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        padding: '4px',
                      }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Badge */}
              <span className={`${product.badgeColor} text-white text-xs px-4 py-1.5 rounded-full font-medium w-fit mb-4`}>
                {product.badge}
              </span>

              {/* Product Name */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-habimint-text mb-2">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-habimint-text-light text-base mb-4">{product.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-habimint-text font-medium">{product.rating}</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-sm text-habimint-primary hover:underline"
                >
                  ({product.reviewCount} reviews)
                </button>
              </div>

              <div className="border-t border-gray-200 mb-6" />

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-4xl font-bold text-habimint-primary">₹{product.price}</span>
                  <span className="text-gray-400 line-through text-xl">₹{product.originalPrice}</span>
                </div>
                <div className="inline-flex items-center bg-green-50 text-habimint-primary text-sm px-3 py-1 rounded-full">
                  You save ₹{savings} ({discountPercent}% off)
                </div>
              </div>

              <div className="border-t border-gray-200 mb-6" />

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-habimint-text mb-2">Quantity</label>
                <div className="flex items-center gap-4 border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-3 hover:bg-gray-50 transition"
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || cartSuccess}
                className={`w-full py-4 rounded-full font-semibold text-lg mb-3 transition flex items-center justify-center gap-2 ${
                  cartSuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-habimint-primary text-white hover:bg-opacity-90'
                }`}
              >
                {cartSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : addingToCart ? (
                  'Adding...'
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <Link href="/checkout">
                <button className="w-full py-4 rounded-full font-semibold text-lg border-2 border-habimint-primary text-habimint-primary hover:bg-habimint-primary hover:text-white transition">
                  Buy Now
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <Lock className="w-4 h-4 text-habimint-primary" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <Truck className="w-4 h-4 text-habimint-primary" />
                  Free delivery above ₹1,499
                </div>
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <RotateCcw className="w-4 h-4 text-habimint-primary" />
                  Easy Returns
                </div>
              </div>

              <div className="border-t border-gray-200 my-6" />

              {/* Features List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-habimint-text mb-4">What's Included</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-habimint-primary" />
                      </div>
                      <span className="text-sm text-habimint-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div>
                <h3 className="text-sm font-medium text-habimint-text mb-3">Share</h3>
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MIDDLE SECTION - Tabs */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-7xl mx-auto">
            {/* Tab Headers */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'about'
                      ? 'border-habimint-primary text-habimint-primary font-semibold'
                      : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('inside')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'inside'
                      ? 'border-habimint-primary text-habimint-primary font-semibold'
                      : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                  }`}
                >
                  Inside the Journal
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'border-habimint-primary text-habimint-primary font-semibold'
                      : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-habimint-primary text-habimint-primary font-semibold'
                      : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                  }`}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-lg max-w-none">
                    <p className="text-habimint-text leading-relaxed">{product.description}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'inside' && (
                <motion.div
                  key="inside"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.insidePages.map((page, index) => (
                      <div key={index} className="group">
                        <div 
                          className="relative rounded-2xl mb-3 bg-habimint-bg" 
                          style={{ 
                            minHeight: '280px',
                            aspectRatio: '4/3',
                          }}
                        >
                          <Image
                            src={page.image}
                            alt={page.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                          />
                        </div>
                        <h4 className="font-heading text-lg font-semibold text-habimint-text mb-1">
                          {page.title}
                        </h4>
                        <p className="text-sm text-habimint-text-light">{page.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-4 pr-4 font-semibold text-habimint-text w-1/3">{key}</td>
                          <td className="py-4 text-habimint-text-light">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Featured Review */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="rounded-2xl"
                    style={{
                      backgroundColor: '#F5F2E8',
                      border: '2px solid #C8DEC8',
                      borderRadius: '16px',
                      padding: '32px',
                      marginBottom: '32px',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                      {/* LEFT: Text */}
                      <div className="flex-1 flex flex-col">
                        <span
                          className="inline-block self-start rounded-full text-xs font-semibold tracking-wider"
                          style={{
                            backgroundColor: '#2D5A27',
                            color: '#FFFFFF',
                            padding: '6px 14px',
                            marginBottom: '16px',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          FEATURED REVIEW
                        </span>

                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p
                          className="italic"
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            color: '#374151',
                            lineHeight: 1.8,
                          }}
                        >
                          &ldquo;As someone who constantly juggles creativity and business, this journal brought a sense of structure and calm into my life. I was one of the first to use it, and honestly, I didn&rsquo;t expect it to have this much impact. The way it guides your thoughts, helps you reflect, and builds discipline without feeling overwhelming is beautiful. It&rsquo;s not just a journal — it feels like a personal space where I can reset every day. I&rsquo;ve seen a real shift in my focus, clarity, and consistency. Highly recommend this to anyone who wants to grow while staying grounded.&rdquo;
                        </p>

                        <div style={{ marginTop: '20px' }}>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 700,
                              fontSize: '16px',
                              color: '#1A1A1A',
                              margin: 0,
                            }}
                          >
                            Shruti Patel
                          </p>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '13px',
                              color: '#6B7280',
                              margin: '4px 0 0 0',
                            }}
                          >
                            Founder, Simply Artistic
                          </p>
                        </div>
                      </div>

                      {/* RIGHT: Image */}
                      <div
                        className="w-full md:w-auto flex-shrink-0"
                        style={{ maxWidth: '320px' }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{
                            aspectRatio: '4 / 3',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          }}
                        >
                          <img
                            src="/images/shruti-review-collage.jpg"
                            alt="Shruti Patel using the Fall Forward journal"
                            className="w-full h-full"
                            style={{ objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating Summary */}
                  <div className="bg-habimint-bg rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-habimint-primary mb-2">{product.rating}</div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-habimint-text-light">{product.reviewCount} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3 mb-2">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{
                                  width:
                                    stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : '3%',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="space-y-6">
                    {TESTIMONIALS.map((testimonial, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-habimint-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-habimint-text">{testimonial.name}</h4>
                              <span className="text-sm text-habimint-text-light">• {testimonial.role}</span>
                            </div>
                            <div className="flex gap-1 mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-habimint-text-light leading-relaxed">{testimonial.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* BOTTOM SECTION - You Might Also Like */}
        {otherProduct && (
          <section className="container mx-auto px-4 mt-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-habimint-text mb-8">You Might Also Like</h2>
              <div className="max-w-md">
                <Link href={`/products/${otherProduct.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden">
                      <Image src={otherProduct.mainImage} alt={otherProduct.name} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`${otherProduct.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}
                        >
                          {otherProduct.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                        {otherProduct.name}
                      </h3>
                      <p className="text-habimint-text-light text-sm mb-4">{otherProduct.tagline}</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-habimint-primary text-2xl font-bold">₹{otherProduct.price}</span>
                        <span className="text-gray-400 line-through text-base">₹{otherProduct.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
