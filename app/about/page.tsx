'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      emoji: '🌱',
      title: 'Intentional Growth',
      description: 'We believe growth happens when you show up consistently, even imperfectly.',
    },
    {
      emoji: '🎨',
      title: 'Art Meets Purpose',
      description: 'Every journal is a collaboration between function and beauty — guided by art that moves you.',
    },
    {
      emoji: '🤝',
      title: 'Community First',
      description: 'From Aham to Ananta is not just our tagline — it\'s a shared journey we take together.',
    },
  ];

  const futureProducts = [
    { icon: '📱', title: 'Habit Tracking App', status: 'Coming Soon' },
    { icon: '🧠', title: 'AI Reflection Tools', status: 'Coming Soon' },
    { icon: '📦', title: 'More Guided Journals', status: 'In Progress' },
    { icon: '🌍', title: 'Growth Community', status: 'Coming Soon' },
  ];

  const products = [
    {
      id: 'fall-forward',
      name: 'Fall Forward',
      tagline: 'Your 4-Month Transformation Journey',
      price: 749,
      originalPrice: 1299,
      image: '/images/fall-forward-hero.jpg',
      badge: 'BESTSELLER',
    },
    {
      id: 'version-2-0',
      name: 'Version 2.0',
      tagline: 'Your 21-Day Guide to Becoming Unstoppable',
      price: 249,
      originalPrice: 599,
      image: '/images/version2-hero.jpg',
      badge: 'NEW',
    },
  ];

  return (
    <>
      <head>
        <title>About Us | Habimint — From Aham to Ananta</title>
        <meta
          name="description"
          content="The story behind Habimint — from a Berlin desk to a brand helping thousands grow through premium guided journals."
        />
      </head>

      <main className="min-h-screen">
        {/* SECTION 1 - HERO */}
        <section className="bg-habimint-primary pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
                From Aham to Ananta
              </h1>
              <p className="text-xl text-habimint-primary-light max-w-2xl mx-auto">
                The story behind Habimint
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - FOUNDER STORY */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-habimint-primary text-sm tracking-widest uppercase mb-4">
                  OUR STORY
                </p>
                <h2 className="font-heading text-4xl font-bold text-habimint-text mb-6">
                  From a Berlin Desk to a Brand That Helps Thousands Grow
                </h2>
                <div className="space-y-4 text-habimint-text-light leading-relaxed">
                  <p>
                    There's a version of me that existed in Berlin — young, ambitious, co-founding a tech
                    startup, managing teams, deadlines, and dreams all at once. From the outside, it looked
                    exciting. From the inside, it was chaos.
                  </p>
                  <p>
                    I was struggling. Not with the work — but with myself. Bad habits I couldn't break. A mind
                    that was always busy but rarely clear. A vision for the future that felt blurry no matter how
                    hard I tried to focus.
                  </p>
                  <p>
                    The only thing that kept me grounded was a simple habit I'd developed without even realising
                    it. Every morning, I'd grab a sticky note — or sometimes just a torn piece of paper — and
                    write down what I needed to do that day. One task at a time. Cross it off. Move forward.
                  </p>
                  <p>
                    Then a friend suggested I try a journal. I did. Then another. Then another. Some had too many
                    pages with nothing to fill. Others had too little space to breathe. None of them felt like
                    they were actually guiding me.
                  </p>
                  <p>
                    So I decided to make one myself.
                  </p>
                  <p>
                    I spent months researching. I studied habits, psychology, journaling methods, personal growth
                    frameworks. I made the first version of Fall Forward and gave it to my friends. They loved
                    it. That's when I knew — this wasn't just for me.
                  </p>
                  <p className="font-semibold text-habimint-text">
                    Habimint was born from that belief — that the right tool, at the right moment, can change the
                    direction of someone's life.
                  </p>
                  <p className="italic text-habimint-primary font-medium mt-6">
                    — Akhilesh Prasad, Founder & CEO, Habimint
                  </p>
                </div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl transform-none md:rotate-2">
                  <Image
                    src="/images/fall-forward-desk.jpg"
                    alt="Habimint Journal on Desk"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - BRAND VALUES */}
        <section className="py-20 bg-habimint-bg">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
            >
              What We Stand For
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-8 text-center"
                >
                  <div className="text-6xl mb-4">{value.emoji}</div>
                  <h3 className="font-heading text-2xl font-bold text-habimint-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-habimint-text-light leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 - VISION */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-habimint-primary-light text-sm tracking-widest uppercase mb-4">
                OUR VISION
              </p>
              <h2 className="font-heading text-4xl font-bold text-white mb-6">
                We're not just building a journal brand.
              </h2>
              <p className="text-xl text-habimint-primary-light leading-relaxed mb-12">
                We're building a self-growth ecosystem — journals, apps, AI tools, and a community of people
                committed to becoming the best version of themselves. The journal is just the beginning.
              </p>

              {/* Future Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {futureProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="text-4xl mb-3">{product.icon}</div>
                    <h4 className="font-semibold text-white mb-2">{product.title}</h4>
                    <span className="inline-block px-3 py-1 bg-habimint-accent text-white text-xs rounded-full">
                      {product.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 - PRODUCTS TEASER */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
            >
              Our Journals
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-habimint-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                        {product.name}
                      </h3>
                      <p className="text-habimint-text-light text-sm mb-4">{product.tagline}</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-habimint-primary text-2xl font-bold">₹{product.price}</span>
                        <span className="text-gray-400 line-through text-base">₹{product.originalPrice}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/shop">
                <button className="inline-flex items-center gap-2 bg-habimint-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition">
                  Shop All Journals
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}