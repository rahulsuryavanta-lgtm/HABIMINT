'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  // Static blog posts (API will replace this)
  const blogs = [
    {
      id: 1,
      image: '/images/fall-forward-inside.jpg',
      category: 'HABITS',
      title: 'Why Morning Journaling Changes Everything',
      excerpt:
        'The first 10 minutes of your day set the tone for everything that follows. Here\'s how to use them intentionally.',
      readTime: '5 min read',
      date: 'April 2025',
      slug: 'morning-journaling-changes-everything',
    },
    {
      id: 2,
      image: '/images/fall-forward-open.jpg',
      category: 'MINDSET',
      title: 'The Science Behind the 21-Day Habit Loop',
      excerpt:
        'It takes more than 21 days to build a habit — but the right structure in those first 3 weeks makes all the difference.',
      readTime: '7 min read',
      date: 'March 2025',
      slug: '21-day-habit-loop',
    },
    {
      id: 3,
      image: '/images/fall-forward-art-1.jpg',
      category: 'GROWTH',
      title: 'From Aham to Ananta: Understanding Your Transformation Journey',
      excerpt:
        'What does it mean to move from self-awareness to limitless potential? Habimint\'s philosophy explained.',
      readTime: '6 min read',
      date: 'March 2025',
      slug: 'aham-to-ananta-transformation',
    },
    {
      id: 4,
      image: '/images/version2-open.jpg',
      category: 'PRODUCTIVITY',
      title: 'How to Track 6 Dimensions of Your Life Daily',
      excerpt:
        'Spiritual, Mental, Physical, Economic, Emotional, General — why tracking all 6 changes everything.',
      readTime: '4 min read',
      date: 'February 2025',
      slug: 'track-6-dimensions',
    },
    {
      id: 5,
      image: '/images/fall-forward-spread.jpg',
      category: 'WELLNESS',
      title: 'Corporate Wellness: Why Journaling is the Next Big Thing',
      excerpt:
        'Companies investing in employee journaling programs are seeing real results. Here\'s the data.',
      readTime: '8 min read',
      date: 'February 2025',
      slug: 'corporate-wellness-journaling',
    },
    {
      id: 6,
      image: '/images/fall-forward-quote.jpg',
      category: 'INSPIRATION',
      title: 'Letters to Your Future Self: The Most Powerful Journaling Practice',
      excerpt:
        'Writing to your future self is the single most transformative journaling exercise you can do.',
      readTime: '5 min read',
      date: 'January 2025',
      slug: 'letters-to-future-self',
    },
  ];

  const categoryColors: Record<string, string> = {
    HABITS: 'bg-habimint-primary',
    MINDSET: 'bg-blue-600',
    GROWTH: 'bg-habimint-accent',
    PRODUCTIVITY: 'bg-orange-600',
    WELLNESS: 'bg-green-600',
    INSPIRATION: 'bg-pink-600',
  };

  return (
    <>
      <head>
        <title>Insights for Growth | Habimint Blog</title>
        <meta
          name="description"
          content="Habits, mindset and intentional living — insights from the Habimint community"
        />
      </head>

      <main className="min-h-screen">
        {/* HERO */}
        <section className="bg-habimint-primary pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                Insights for Growth
              </h1>
              <p className="text-xl text-habimint-primary-light max-w-3xl mx-auto">
                Habits, mindset and intentional living — from the Habimint community
              </p>
            </motion.div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="py-20 bg-habimint-bg">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`${categoryColors[blog.category]} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                      >
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-heading text-xl font-bold text-habimint-text mb-3 group-hover:text-habimint-primary transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    <p className="text-habimint-text-light text-sm mb-4 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </div>
                      <span>{blog.date}</span>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-habimint-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-habimint-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Get Weekly Insights
              </h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Join 5,000+ readers getting weekly tips on habits, mindset and intentional growth.
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
      </main>
    </>
  );
}