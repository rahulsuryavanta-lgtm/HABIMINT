'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function B2BPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    type: '',
    quantity: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const useCases = [
    {
      icon: '🏢',
      title: 'Corporate Gifting',
      description:
        'Make your gifting memorable. Habimint journals are premium, purposeful gifts that employees actually use and remember.',
      benefits: ['Custom branding', 'Bulk pricing', 'Gift wrapping'],
    },
    {
      icon: '💼',
      title: 'Employee Wellness Programs',
      description:
        'Invest in your team\'s mental clarity, productivity and personal growth with structured journaling programs.',
      benefits: ['Habit tracking', 'Goal setting', 'Monthly reflection'],
    },
    {
      icon: '🎓',
      title: 'Universities & Colleges',
      description:
        'Help students build the habits, clarity and focus they need to thrive academically and personally.',
      benefits: ['Custom covers', 'Semester planning', 'Study habits'],
    },
    {
      icon: '🏫',
      title: 'Schools & Institutions',
      description:
        'Build a culture of reflection, gratitude and intentional growth from an early age.',
      benefits: ['Age-appropriate design', 'Bulk pricing', 'Custom content'],
    },
  ];

  const benefits = [
    {
      icon: '✓',
      title: 'Premium Quality',
      description: '157gsm cover, 80gsm paper, case-bound',
    },
    {
      icon: '✓',
      title: 'Custom Branding',
      description: 'Your logo, colors and message',
    },
    {
      icon: '✓',
      title: 'Bulk Pricing',
      description: 'Special rates from 20 units',
    },
    {
      icon: '✓',
      title: 'Pan-India Delivery',
      description: 'Fast, reliable shipping',
    },
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      range: '20-49 units',
      badge: null,
      features: ['Standard design', 'Brand sticker', 'Basic packaging'],
    },
    {
      name: 'Growth',
      range: '50-199 units',
      badge: 'POPULAR',
      features: ['Custom cover option', 'Logo printing', 'Premium packaging', 'Priority delivery'],
    },
    {
      name: 'Enterprise',
      range: '200+ units',
      badge: null,
      features: ['Fully custom design', 'Dedicated account manager', 'Custom content', 'Express delivery'],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Connect to actual API
      // await fetch('/api/b2b/enquiry', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <head>
        <title>B2B & Corporate Gifting | Habimint — Bulk Orders & Custom Branding</title>
        <meta
          name="description"
          content="Premium custom-branded journals for corporate gifting, employee wellness and institutional programs. Bulk pricing from 20 units."
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
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-2">
                Elevate Your Team.
              </h1>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">Gift Growth.</h2>
              <p className="text-xl text-habimint-primary-light mb-8 max-w-3xl mx-auto">
                Premium custom-branded journals for corporate gifting, employee wellness and institutional
                programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-white text-habimint-primary px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 - WHO IS IT FOR */}
        <section className="py-20 bg-habimint-bg">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
            >
              Perfect For
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md p-8"
                >
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="font-heading text-2xl font-bold text-habimint-text mb-3">{useCase.title}</h3>
                  <p className="text-habimint-text-light mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-habimint-text">Benefits:</p>
                    <ul className="space-y-1">
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-habimint-text-light flex items-center gap-2">
                          <Check className="w-4 h-4 text-habimint-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - WHY HABIMINT B2B */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
            >
              Why Companies Choose Habimint
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-habimint-primary">{benefit.icon}</span>
                  </div>
                  <h3 className="font-semibold text-habimint-text mb-2">{benefit.title}</h3>
                  <p className="text-sm text-habimint-text-light">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 - PRICING TIERS */}
        <section className="py-20 bg-habimint-bg">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl font-bold text-habimint-text text-center mb-12"
            >
              Bulk Pricing
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-md p-8 relative ${
                    tier.badge ? 'border-2 border-habimint-accent' : ''
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-habimint-accent text-white text-xs px-4 py-1 rounded-full font-semibold">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-habimint-text text-center mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-habimint-text-light text-center mb-4">{tier.range}</p>
                  <p className="text-center text-2xl font-bold text-habimint-primary mb-6">
                    Contact for pricing
                  </p>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-habimint-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-habimint-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - ENQUIRY FORM */}
        <section id="enquiry-form" className="py-20 bg-habimint-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold text-white mb-4">Let's Talk</h2>
              <p className="text-xl text-habimint-primary-light">
                Fill out the form and we'll get back to you within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 max-w-2xl mx-auto"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                    Thank You!
                  </h3>
                  <p className="text-habimint-text-light">
                    We've received your enquiry and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                      >
                        <option value="">Select type</option>
                        <option value="corporate">Corporate Gifting</option>
                        <option value="wellness">Employee Wellness</option>
                        <option value="university">University</option>
                        <option value="school">School</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                      >
                        <option value="">Select quantity</option>
                        <option value="20-49">20-49</option>
                        <option value="50-99">50-99</option>
                        <option value="100-199">100-199</option>
                        <option value="200+">200+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                      Custom Requirements
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-habimint-primary text-white py-4 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}