'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Mail } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      category: '📦 ORDERS & SHIPPING',
      faqs: [
        {
          id: 'shipping-time',
          question: 'How long does delivery take?',
          answer:
            'Standard delivery takes 3-5 business days across India. Express delivery (1-2 days) is available at ₹199. Free delivery on orders above ₹1,499.',
        },
        {
          id: 'international',
          question: 'Do you ship outside India?',
          answer:
            'Currently we ship pan-India only. International shipping is coming soon. Sign up for our newsletter to get notified when we launch internationally.',
        },
        {
          id: 'track-order',
          question: 'Can I track my order?',
          answer:
            'Yes! Once your order is shipped, you\'ll receive a tracking link via email and SMS. You can also track your order from your account dashboard.',
        },
        {
          id: 'damaged-order',
          question: 'What if my order is damaged?',
          answer:
            'We have a hassle-free return policy. Contact us within 7 days of delivery at hello@habimint.com with photos of the damaged product, and we\'ll arrange a replacement immediately.',
        },
      ],
    },
    {
      category: '📘 ABOUT THE JOURNALS',
      faqs: [
        {
          id: 'fall-forward',
          question: 'What is Fall Forward?',
          answer:
            'Fall Forward is a 316-page premium guided journal designed for a 4-month transformation journey. It includes daily morning and evening pages, weekly reflections, monthly planning, budget tracking, and 4 exclusive artworks by Persian and Indian artists.',
        },
        {
          id: 'version-2',
          question: 'What is Version 2.0?',
          answer:
            'Version 2.0 is a 21-day intensive habit tracker. It helps you track 6 life dimensions daily — Spiritual, Mental, Physical, Economic, Emotional, and General. Perfect for anyone looking to transform their habits in 3 weeks.',
        },
        {
          id: 'size',
          question: 'What size are the journals?',
          answer:
            'Fall Forward is 22.5 × 16.5 × 2.5 cm (A4 landscape format). Version 2.0 is A5 spiral bound (21 × 15 cm). Both sizes are designed for comfortable writing and portability.',
        },
        {
          id: 'paper-quality',
          question: 'What quality paper is used?',
          answer:
            'Fall Forward uses a 157gsm cover with 80gsm inner pages, matt laminated case-bound cover. Version 2.0 uses premium 80gsm paper with spiral binding that lays flat for easy writing.',
        },
      ],
    },
    {
      category: '💳 PAYMENTS & RETURNS',
      faqs: [
        {
          id: 'payment-methods',
          question: 'What payment methods do you accept?',
          answer:
            'We accept UPI, credit/debit cards, net banking, and cash on delivery through our secure payment gateway powered by Razorpay.',
        },
        {
          id: 'returns',
          question: 'Can I return a journal?',
          answer:
            'Yes, unused journals in original packaging can be returned within 7 days of delivery for a full refund. Used journals cannot be returned, but manufacturing defects are covered under our quality guarantee.',
        },
        {
          id: 'secure-payment',
          question: 'Is my payment information secure?',
          answer:
            'Absolutely. We use industry-standard SSL encryption and never store your payment details. All transactions are processed through secure, PCI-compliant payment gateways.',
        },
      ],
    },
    {
      category: '🏢 B2B & BULK ORDERS',
      faqs: [
        {
          id: 'bulk-minimum',
          question: 'What is the minimum order for bulk pricing?',
          answer:
            'Minimum 20 units for bulk pricing. Custom branding options are available from 50 units onwards. Contact us at hello@habimint.com for a detailed quote.',
        },
        {
          id: 'customize',
          question: 'Can you customize the journal cover?',
          answer:
            'Yes! From 50 units, we can add your company logo, custom colors, and messaging to the journal cover. Full custom designs are available for orders of 200+ units.',
        },
        {
          id: 'bulk-delivery',
          question: 'How long does bulk order delivery take?',
          answer:
            'Standard bulk orders (with brand stickers) take 7-10 business days. Custom branded orders with printed covers take 15-20 business days. Express delivery is available for an additional charge.',
        },
      ],
    },
  ];

  // Filter FAQs based on search query
  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.faqs.length > 0);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <>
      <head>
        <title>FAQ | Habimint — Frequently Asked Questions</title>
        <meta name="description" content="Everything you need to know about Habimint journals" />
      </head>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((cat) =>
              cat.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              }))
            ),
          }),
        }}
      />

      <main className="min-h-screen bg-habimint-bg">
        {/* HERO */}
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-habimint-text mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-habimint-text-light max-w-3xl mx-auto mb-8">
                Everything you need to know about Habimint journals
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-habimint-primary focus:outline-none text-habimint-text"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ CATEGORIES */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {filteredCategories.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Category Header */}
                  <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                    {category.category}
                  </h2>

                  {/* FAQs */}
                  <div className="space-y-4">
                    {category.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`bg-white rounded-xl overflow-hidden transition-all ${
                          openFaq === faq.id ? 'shadow-lg border-l-4 border-habimint-primary' : 'shadow-md'
                        }`}
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className={`font-semibold text-lg ${
                              openFaq === faq.id ? 'text-habimint-primary' : 'text-habimint-text'
                            }`}
                          >
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-habimint-text-light transition-transform flex-shrink-0 ml-4 ${
                              openFaq === faq.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Answer */}
                        <AnimatePresence>
                          {openFaq === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 text-habimint-text-light leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {filteredCategories.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <p className="text-habimint-text-light text-lg">
                    No questions found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl font-bold text-habimint-text mb-3">
                Still have questions?
              </h2>
              <p className="text-habimint-text-light mb-6">We're here to help!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@habimint.com"
                  className="inline-flex items-center gap-2 bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  <Mail className="w-5 h-5" />
                  hello@habimint.com
                </a>
                <a
                  href="https://wa.me/918884049090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-habimint-primary text-habimint-primary px-8 py-3 rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}