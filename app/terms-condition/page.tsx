'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, ShoppingBag, CreditCard, Mail, MapPin } from 'lucide-react';
import BackToTop from '@/components/ui/BackToTop';

const TOC = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'products', label: 'Products & Pricing' },
  { id: 'orders', label: 'Orders & Payment' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'b2b', label: 'B2B & Bulk Orders' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'accounts', label: 'User Accounts' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact Us' },
];

const SUMMARY = [
  { icon: FileCheck, title: 'Agreement', desc: 'By using our site you accept these terms' },
  { icon: ShoppingBag, title: 'Orders', desc: 'Confirmed only after successful payment' },
  { icon: CreditCard, title: 'Refunds', desc: 'Within 7 days for unused, undamaged journals' },
  { icon: FileCheck, title: 'Shipping', desc: 'Free over ₹1,499 — 3-5 business days' },
];

export default function TermsPage() {
  const [active, setActive] = useState('acceptance');

  const handleTocClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* HERO */}
      <section style={{ backgroundColor: '#2D5A27', padding: '80px 24px' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-white"
            style={{ fontSize: 'clamp(36px, 6vw, 48px)', lineHeight: 1.15 }}
          >
            Terms &amp; Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
            style={{ color: '#C8DEC8', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}
          >
            Last updated May 2025
          </motion.p>
        </div>
      </section>

      {/* SUMMARY BANNER */}
      <section style={{ padding: '40px 24px', backgroundColor: '#FFFFFF' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto rounded-2xl"
          style={{
            maxWidth: '900px',
            backgroundColor: '#F5F2E8',
            padding: '40px',
          }}
        >
          <h2 className="font-heading mb-6" style={{ fontSize: '24px', color: '#2D5A27' }}>
            Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUMMARY.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-5 flex gap-4 items-start"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#2D5A27' }}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      color: '#1A1A1A',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '15px',
                      marginBottom: 4,
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      color: '#6B7280',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="mt-6 text-center"
            style={{ color: '#374151', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
          >
            Questions? Email us at{' '}
            <a href="mailto:info@habimint.com" className="underline font-medium" style={{ color: '#2D5A27' }}>
              info@habimint.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '60px 24px' }}>
        <div className="mx-auto grid gap-10 lg:grid-cols-[260px_1fr]" style={{ maxWidth: '1100px' }}>
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#F5F2E8' }}>
              <p className="font-heading mb-3" style={{ fontSize: '18px', color: '#2D5A27' }}>
                Table of Contents
              </p>
              <ol className="space-y-2">
                {TOC.map((item, idx) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTocClick(item.id)}
                      className="text-left w-full transition"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: active === item.id ? '#2D5A27' : '#374151',
                        fontWeight: active === item.id ? 600 : 400,
                        opacity: active === item.id ? 1 : 0.85,
                      }}
                    >
                      {idx + 1}. {item.label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* CONTENT */}
          <article
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '15px',
              color: '#374151',
              lineHeight: 1.9,
            }}
          >
            <p className="mb-10">
              By accessing and using habimint.com, you agree to be bound by these
              Terms and Conditions and our Privacy Policy. If you do not agree,
              please do not use our website.
            </p>

            {TOC.map((s, idx) => (
              <Section key={s.id} id={s.id} number={idx + 1} title={s.label}>
                {renderContent(s.id)}
              </Section>
            ))}
          </article>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      style={{
        borderLeft: '4px solid #2D5A27',
        paddingLeft: 20,
        marginBottom: 48,
        scrollMarginTop: 100,
      }}
    >
      <h2 className="font-heading flex items-center gap-3 mb-4" style={{ fontSize: '22px', color: '#1A1A1A' }}>
        <span
          className="inline-flex items-center justify-center rounded-full text-white text-xs"
          style={{ backgroundColor: '#2D5A27', width: 26, height: 26, marginRight: 4 }}
        >
          {number}
        </span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function renderContent(id: string): React.ReactNode {
  switch (id) {
    case 'acceptance':
      return (
        <p>
          These Terms constitute a legally binding agreement between you and
          Habimint LLP. We reserve the right to update these Terms at any time.
          Continued use of our website after changes constitutes acceptance.
        </p>
      );
    case 'products':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>All prices are in Indian Rupees (₹) inclusive of applicable GST</li>
          <li>We reserve the right to change prices without prior notice</li>
          <li>Product images are for illustration — actual product may vary slightly in color</li>
          <li>Availability is subject to stock levels</li>
          <li>We reserve the right to limit quantities per order</li>
        </ul>
      );
    case 'orders':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>Orders are confirmed only after successful payment</li>
          <li>Accepted methods: UPI, credit/debit cards, net banking, and cash on delivery</li>
          <li>Payment is processed securely through Razorpay</li>
          <li>
            In case of payment failure, no amount will be deducted. If deducted
            accidentally, refund within 5-7 business days
          </li>
          <li>We reserve the right to cancel orders due to pricing errors or stock unavailability</li>
          <li>You will receive an order confirmation email after successful payment</li>
        </ul>
      );
    case 'shipping':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>Standard delivery: 3-5 business days across India</li>
          <li>Express delivery: 1-2 business days at additional ₹199</li>
          <li>Free delivery on orders above ₹1,499</li>
          <li>Delivery timelines are estimates and may vary due to location, weather or courier delays</li>
          <li>We are not responsible for delays caused by third-party courier partners or natural events</li>
          <li>Risk of loss passes to you upon delivery</li>
        </ul>
      );
    case 'returns':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>Unused journals can be returned within 7 days of delivery</li>
          <li>Items must be in original, undamaged packaging</li>
          <li>Used journals cannot be returned under any circumstances</li>
          <li>
            Manufacturing defects are fully covered — contact us within 48 hours
            of delivery with photographs
          </li>
          <li>Refunds processed within 5-7 business days to the original payment method</li>
          <li>Shipping charges are non-refundable</li>
          <li>
            To initiate a return, email{' '}
            <a href="mailto:info@habimint.com" className="underline" style={{ color: '#2D5A27' }}>
              info@habimint.com
            </a>{' '}
            with your order number and reason
          </li>
        </ul>
      );
    case 'b2b':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>Bulk orders of 20+ units are subject to special pricing</li>
          <li>Custom branded orders cannot be cancelled once production has commenced</li>
          <li>B2B orders with custom designs have a lead time of 15-20 business days</li>
          <li>Samples available on request for orders above 100 units</li>
          <li>B2B pricing and terms are discussed separately — contact us via the B2B enquiry form</li>
        </ul>
      );
    case 'ip':
      return (
        <p>
          All content on habimint.com — including text, images, logos, artwork,
          journal designs, and the &ldquo;From Aham to Ananta&rdquo; philosophy — is
          the intellectual property of Habimint LLP. Unauthorized reproduction,
          distribution, or commercial use of any content is strictly prohibited
          and may result in legal action.
        </p>
      );
    case 'accounts':
      return (
        <ul className="list-disc pl-6 space-y-1">
          <li>You are responsible for maintaining the confidentiality of your account credentials</li>
          <li>You must notify us immediately of any unauthorized access</li>
          <li>You must provide accurate and complete information when creating an account</li>
          <li>We reserve the right to terminate accounts that violate these Terms</li>
        </ul>
      );
    case 'liability':
      return (
        <p>
          To the fullest extent permitted by law, Habimint LLP shall not be liable
          for any indirect, incidental, special, or consequential damages arising
          from the use of our products or website. Our maximum liability shall not
          exceed the value of the product purchased by you.
        </p>
      );
    case 'law':
      return (
        <p>
          These Terms are governed by and construed in accordance with the laws of
          India. Any disputes arising shall be subject to the exclusive
          jurisdiction of courts in Bharuch, Gujarat, India.
        </p>
      );
    case 'contact':
      return <ContactCard />;
    default:
      return null;
  }
}

function ContactCard() {
  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        border: '1px solid #E5E0D5',
      }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#2D5A27' }}
        >
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium" style={{ color: '#1A1A1A' }}>
            Email
          </p>
          <a
            href="mailto:info@habimint.com"
            className="underline"
            style={{ color: '#2D5A27' }}
          >
            info@habimint.com
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#2D5A27' }}
        >
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold" style={{ color: '#1A1A1A' }}>
            Habimint LLP
          </p>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.7 }}>
            B-15, JAY JALARAM NAGAR, GADKHOL PATIYA
            <br />
            ANKLESHWAR, GUJARAT 393010, India
          </p>
        </div>
      </div>
    </div>
  );
}
