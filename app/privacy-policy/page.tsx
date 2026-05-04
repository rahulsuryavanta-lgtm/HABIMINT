'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, Lock, Handshake, CheckCircle, Mail, MapPin } from 'lucide-react';
import BackToTop from '@/components/ui/BackToTop';

const TOC = [
  { id: 'collect', label: 'What Information Do We Collect?' },
  { id: 'process', label: 'How Do We Process Your Information?' },
  { id: 'share', label: 'When and With Whom Do We Share?' },
  { id: 'cookies', label: 'Do We Use Cookies?' },
  { id: 'social-logins', label: 'How Do We Handle Social Logins?' },
  { id: 'retention', label: 'How Long Do We Keep Your Information?' },
  { id: 'safety', label: 'How Do We Keep Your Information Safe?' },
  { id: 'rights', label: 'What Are Your Privacy Rights?' },
  { id: 'dnt', label: 'Do-Not-Track Features' },
  { id: 'updates', label: 'Updates to This Notice' },
  { id: 'contact', label: 'How to Contact Us' },
  { id: 'review-data', label: 'Review, Update or Delete Your Data' },
];

const SUMMARY = [
  { icon: ClipboardList, title: 'What we collect', desc: 'Names, emails, addresses, payment info' },
  { icon: Lock, title: 'How we use it', desc: 'To process orders, improve services, communicate' },
  { icon: Handshake, title: 'Who we share with', desc: 'Shipping partners, Razorpay, analytics only' },
  { icon: CheckCircle, title: 'Your rights', desc: 'Access, correct, delete your data anytime' },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState('collect');

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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
            style={{ color: '#C8DEC8', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}
          >
            Last updated November 17, 2025
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
          <h2
            className="font-heading mb-6"
            style={{ fontSize: '24px', color: '#2D5A27' }}
          >
            Summary of Key Points
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
            style={{
              color: '#374151',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
            }}
          >
            Questions? Email us at{' '}
            <a
              href="mailto:info@habimint.com"
              className="underline font-medium"
              style={{ color: '#2D5A27' }}
            >
              info@habimint.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '60px 24px' }}>
        <div
          className="mx-auto grid gap-10 lg:grid-cols-[260px_1fr]"
          style={{ maxWidth: '1100px' }}
        >
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#F5F2E8' }}
            >
              <p
                className="font-heading mb-3"
                style={{ fontSize: '18px', color: '#2D5A27' }}
              >
                Table of Contents
              </p>
              <ol className="space-y-2">
                {TOC.map((item, idx) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTocClick(item.id)}
                      className="text-left w-full transition hover:opacity-100"
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
            {/* Intro */}
            <p className="mb-10">
              This Privacy Notice for <strong>Habimint LLP</strong> (doing business as
              Habimint) (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), describes how and why we
              might access, collect, store, use, and/or share your personal
              information when you use our services, including when you visit
              habimint.com, use HabiMint Journals &amp; Stationery, or engage with us
              in other related ways.
              <br />
              Questions or concerns? Contact us at{' '}
              <a
                href="mailto:info@habimint.com"
                className="underline"
                style={{ color: '#2D5A27' }}
              >
                info@habimint.com
              </a>
              .
            </p>

            {TOC.map((s, idx) => (
              <Section key={s.id} id={s.id} number={idx + 1} title={s.label}>
                {renderSectionContent(s.id)}
              </Section>
            ))}
          </article>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* Section wrapper                                          */
/* ─────────────────────────────────────────────────────── */
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
      <h2
        className="font-heading flex items-center gap-3 mb-4"
        style={{ fontSize: '22px', color: '#1A1A1A' }}
      >
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

/* ─────────────────────────────────────────────────────── */
/* Section content                                          */
/* ─────────────────────────────────────────────────────── */
function renderSectionContent(id: string): React.ReactNode {
  switch (id) {
    case 'collect':
      return (
        <>
          <h3 className="font-semibold mt-2 mb-2" style={{ color: '#1A1A1A' }}>
            Personal information you disclose to us
          </h3>
          <p className="mb-4">
            We collect personal information that you voluntarily provide when you
            register, express interest in our products, or contact us.
          </p>
          <p className="mb-2 font-medium" style={{ color: '#1A1A1A' }}>
            Personal Information collected includes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Names</li>
            <li>Phone numbers</li>
            <li>Email addresses</li>
            <li>Mailing addresses</li>
            <li>Usernames and passwords</li>
            <li>Contact preferences</li>
            <li>Billing addresses</li>
            <li>Debit/credit card numbers</li>
          </ul>
          <p className="mb-3">
            <strong>Sensitive Information:</strong> We do not process sensitive information.
          </p>
          <p className="mb-3">
            <strong>Payment Data:</strong> Collected to process purchases — handled and
            stored securely by Razorpay. View their privacy policy at{' '}
            <a
              href="https://razorpay.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              razorpay.com/privacy
            </a>
            .
          </p>
          <p className="mb-6">
            <strong>Social Media Login Data:</strong> If you register using Facebook,
            Google, or other social media, we collect profile information as
            described in Section 5.
          </p>
          <h3 className="font-semibold mt-4 mb-2" style={{ color: '#1A1A1A' }}>
            Information automatically collected
          </h3>
          <p className="mb-3">
            We automatically collect certain information when you visit our Services
            — this does not reveal your specific identity but includes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Log and Usage Data (IP address, browser type, pages viewed)</li>
            <li>Device Data (device type, OS, browser settings)</li>
            <li>Location Data (approximate location via IP address)</li>
          </ul>
          <p className="mb-6">
            <strong>Google API:</strong> Our use of Google APIs adheres to Google
            API Services User Data Policy including Limited Use requirements.
          </p>
          <h3 className="font-semibold mt-4 mb-2" style={{ color: '#1A1A1A' }}>
            Information from other sources
          </h3>
          <p>
            We may collect limited data from public databases, marketing partners,
            and social media platforms to enhance our marketing and update our
            records.
          </p>
        </>
      );
    case 'process':
      return (
        <>
          <p className="mb-3">We process your personal information for these reasons:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To facilitate account creation and authentication</li>
            <li>To deliver services to you</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To send administrative information</li>
            <li>To fulfill and manage your orders, payments and returns</li>
            <li>To enable user-to-user communications</li>
            <li>To request feedback</li>
            <li>To send marketing and promotional communications (with your consent — opt out anytime)</li>
            <li>To deliver targeted advertising</li>
            <li>To post testimonials</li>
            <li>To protect our Services from fraud</li>
            <li>To administer prize draws and competitions</li>
            <li>To evaluate and improve our Services</li>
            <li>To identify usage trends</li>
            <li>To determine effectiveness of marketing campaigns</li>
            <li>To comply with legal obligations</li>
          </ul>
        </>
      );
    case 'share':
      return (
        <>
          <p className="mb-3">
            We may share your data with third-party vendors who perform services on
            our behalf. Categories include:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Affiliate Marketing Programs</li>
            <li>AI Platforms</li>
            <li>Cloud Computing Services</li>
            <li>Communication &amp; Collaboration Tools</li>
            <li>Data Analytics Services</li>
            <li>Finance &amp; Accounting Tools</li>
            <li>Order Fulfillment Service Providers</li>
            <li>Payment Processors (Razorpay)</li>
            <li>Performance Monitoring Tools</li>
            <li>Retargeting Platforms</li>
            <li>Sales &amp; Marketing Tools</li>
            <li>Social Networks</li>
          </ul>
          <p className="mb-3">We may also share information during:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Business Transfers (mergers, acquisitions)</li>
            <li>When using Google Maps Platform APIs</li>
            <li>With Affiliates (parent company, subsidiaries)</li>
            <li>With Business Partners for promotions</li>
          </ul>
        </>
      );
    case 'cookies':
      return (
        <>
          <p className="mb-3">
            Yes. We use cookies and tracking technologies to maintain security, fix
            bugs, save preferences, and assist with basic site functions.
          </p>
          <p className="mb-3">
            We also permit third parties to use tracking technologies for analytics
            and advertising, including abandoned cart reminders.
          </p>
          <p>
            <strong>Google Analytics:</strong> We use Google Analytics to track
            service usage. Opt out at:{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </p>
        </>
      );
    case 'social-logins':
      return (
        <>
          <p className="mb-3">
            Our Services allow you to register using social media accounts
            (Facebook, Google, etc.). We receive profile information including your
            name, email, and profile picture.
          </p>
          <p>
            We use this information only as described in this Privacy Notice and
            are not responsible for the third-party social media provider&rsquo;s
            use of your data.
          </p>
        </>
      );
    case 'retention':
      return (
        <p>
          We keep your personal information only as long as necessary for the
          purposes outlined in this notice, or as required by law. When no longer
          needed, we delete or anonymize your data.
        </p>
      );
    case 'safety':
      return (
        <p>
          We implement appropriate technical and organizational security measures
          to protect your personal information. However, no internet transmission
          is 100% secure. Access our Services only within a secure environment.
        </p>
      );
    case 'rights':
      return (
        <>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Withdraw consent at any time</li>
            <li>Opt out of marketing communications (click unsubscribe in any email, or reply STOP to SMS)</li>
            <li>Review and update your account information</li>
            <li>Request account termination</li>
          </ul>
          <p>
            To exercise these rights, log into your account settings or contact us
            at{' '}
            <a
              href="mailto:info@habimint.com"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              info@habimint.com
            </a>
            .
          </p>
        </>
      );
    case 'dnt':
      return (
        <p>
          We do not currently respond to DNT browser signals as no uniform
          technology standard has been finalized. If a standard is adopted in
          future, we will update this notice.
        </p>
      );
    case 'updates':
      return (
        <p>
          We may update this Privacy Notice from time to time. The updated version
          will show a revised date at the top. We encourage you to review this
          notice frequently.
        </p>
      );
    case 'contact':
      return <ContactCard />;
    case 'review-data':
      return (
        <p>
          Based on applicable laws, you may request access to, correction of, or
          deletion of your personal information. To make such a request, contact:{' '}
          <a
            href="mailto:info@habimint.com"
            className="underline"
            style={{ color: '#2D5A27' }}
          >
            info@habimint.com
          </a>
          .
        </p>
      );
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────── */
/* Contact card (shared)                                     */
/* ─────────────────────────────────────────────────────── */
export function ContactCard() {
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
