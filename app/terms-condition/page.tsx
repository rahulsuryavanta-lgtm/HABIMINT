'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, AlertTriangle, X as XIcon } from 'lucide-react';
import BackToTop from '@/components/ui/BackToTop';
import ResponsiveToc from '@/components/ui/ResponsiveToc';

const TOC = [
  { id: 'services', label: 'Our Services' },
  { id: 'ip', label: 'Intellectual Property Rights' },
  { id: 'representations', label: 'User Representations' },
  { id: 'registration', label: 'User Registration' },
  { id: 'products', label: 'Products' },
  { id: 'purchases', label: 'Purchases and Payment' },
  { id: 'returns', label: 'Return Policy' },
  { id: 'prohibited', label: 'Prohibited Activities' },
  { id: 'contributions', label: 'User Generated Contributions' },
  { id: 'contribution-license', label: 'Contribution License' },
  { id: 'reviews', label: 'Guidelines for Reviews' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'third-party', label: 'Third-Party Websites and Content' },
  { id: 'services-mgmt', label: 'Services Management' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'copyright', label: 'Copyright Infringements' },
  { id: 'termination', label: 'Term and Termination' },
  { id: 'modifications', label: 'Modifications and Interruptions' },
  { id: 'law', label: 'Governing Law' },
  { id: 'disputes', label: 'Dispute Resolution' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'disclaimer', label: 'Disclaimer' },
  { id: 'liability', label: 'Limitations of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'user-data', label: 'User Data' },
  { id: 'electronic', label: 'Electronic Communications' },
  { id: 'misc', label: 'Miscellaneous' },
  { id: 'contact', label: 'Contact Us' },
];

export default function TermsPage() {
  const [active, setActive] = useState('services');

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
            Last updated November 22, 2025
          </motion.p>
        </div>
      </section>

      {/* INTRO PARAGRAPH (cream banner) */}
      <section style={{ backgroundColor: '#F5F2E8', padding: '40px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto"
          style={{
            maxWidth: '900px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            color: '#374151',
            lineHeight: 1.9,
          }}
        >
          <p className="mb-4">
            We are <strong>Habimint LLP</strong>, doing business as HabiMint
            (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), registered in India at B-15,
            JAY JALARAM NAGAR, GADKHOL PATIYA, ANKLESHWAR, GUJARAT 393010.
          </p>
          <p className="mb-4">
            We operate the website{' '}
            <a
              href="https://habimint.com"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              https://habimint.com
            </a>{' '}
            and related products and services.
          </p>
          <p className="mb-4">
            You can contact us by email at{' '}
            <a
              href="mailto:info@habimint.com"
              className="underline font-medium"
              style={{ color: '#2D5A27' }}
            >
              info@habimint.com
            </a>{' '}
            or by mail to our registered address above.
          </p>
          <p className="mb-4">
            By accessing the Services, you have read, understood, and agreed to be
            bound by all of these Legal Terms.{' '}
            <strong>
              IF YOU DO NOT AGREE, YOU MUST DISCONTINUE USE IMMEDIATELY.
            </strong>
          </p>
          <p>Minors (under 18) must have parental permission to use our Services.</p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-4 sm:px-6" style={{ padding: '60px 0' }}>
        <div
          className="mx-auto grid gap-6 lg:gap-10 lg:grid-cols-[260px_1fr]"
          style={{ maxWidth: '1100px' }}
        >
          {/* TOC (responsive) */}
          <ResponsiveToc items={TOC} active={active} onClick={handleTocClick} />

          {/* CONTENT */}
          <article
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '15px',
              color: '#374151',
              lineHeight: 1.9,
            }}
          >
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
      <h2
        className="font-heading flex items-center gap-3 mb-4 text-[20px] sm:text-[22px]"
        style={{ color: '#1A1A1A' }}
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

const PROHIBITED_ITEMS = [
  'Systematically retrieving data to create databases without written permission',
  'Tricking, defrauding, or misleading users or us',
  'Circumventing security features of the Services',
  'Disparaging or harming us or the Services',
  'Using information obtained to harass or harm others',
  'Submitting false reports of abuse or misconduct',
  'Using the Services inconsistently with applicable laws',
  'Uploading viruses, malware, or harmful code',
  'Using automated systems (bots, scrapers, data mining)',
  'Deleting copyright notices from any Content',
  'Impersonating another user or person',
  'Interfering with or disrupting the Services',
  'Attempting to bypass access restrictions',
  'Copying or reverse engineering our software',
  'Using the Services to compete with us commercially',
  'Collecting user data for unsolicited communications',
];

function renderContent(id: string): React.ReactNode {
  switch (id) {
    case 'services':
      return (
        <p>
          The information provided when using the Services is not intended for
          distribution where such use would be contrary to law. Those who access
          our Services from other locations do so on their own initiative and are
          solely responsible for compliance with local laws.
        </p>
      );
    case 'ip':
      return (
        <>
          <p className="mb-4">
            We are the owner or licensee of all intellectual property rights in
            our Services, including source code, databases, software, website
            designs, audio, video, text, photographs, graphics, trademarks,
            service marks, and logos (the &ldquo;Content&rdquo; and &ldquo;Marks&rdquo;). These are
            protected by copyright and trademark laws worldwide.
          </p>
          <p className="mb-4">
            We grant you a non-exclusive, non-transferable, revocable license to
            access the Services and download or print content solely for your
            personal, non-commercial use.
          </p>
          <p className="mb-4">
            No part of the Services may be copied, reproduced, republished, sold,
            or otherwise exploited for commercial purposes without our express
            prior written permission. Contact:{' '}
            <a
              href="mailto:info@habimint.com"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              info@habimint.com
            </a>{' '}
            for permissions.
          </p>
          <p className="mb-6">
            Any breach of these Intellectual Property Rights will terminate your
            right to use our Services immediately.
          </p>

          <h3
            className="font-semibold mt-2 mb-2"
            style={{ color: '#1A1A1A', fontSize: 16 }}
          >
            Your Submissions and Contributions
          </h3>
          <p className="mb-4">
            By sending us any feedback, suggestions, or other information
            (&ldquo;Submissions&rdquo;), you assign to us all intellectual property rights in
            such Submission. We may use Submissions for any lawful purpose without
            acknowledgment or compensation to you.
          </p>
          <p className="mb-4">
            When you post Contributions, you grant us an unrestricted, unlimited,
            irrevocable, perpetual, non-exclusive, transferable, royalty-free,
            worldwide license to use, copy, reproduce, distribute, sell, publish,
            and exploit your Contributions for any purpose.
          </p>
          <p>
            You are responsible for ensuring your Contributions are not illegal,
            harassing, hateful, harmful, defamatory, obscene, or misleading. We
            may remove or edit any Contributions at any time without notice.
          </p>
        </>
      );
    case 'representations':
      return (
        <>
          <p className="mb-3">
            By using the Services, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All registration information you submit is true, accurate, current, and complete</li>
            <li>You have the legal capacity to agree to these Terms</li>
            <li>You are not a minor, or if a minor, have parental permission</li>
            <li>You will not access the Services through automated means (bots, scripts)</li>
            <li>You will not use the Services for any illegal purpose</li>
            <li>Your use will not violate any applicable law or regulation</li>
          </ul>
        </>
      );
    case 'registration':
      return (
        <p>
          You may be required to register to use the Services. You agree to keep
          your password confidential and are responsible for all activity under
          your account. We reserve the right to remove or reclaim usernames we
          deem inappropriate.
        </p>
      );
    case 'products':
      return (
        <p>
          We make every effort to display product colors, features, and
          specifications accurately. However, your electronic display may not
          accurately reflect actual colors. All products are subject to
          availability. We reserve the right to discontinue any product at any
          time. Prices are subject to change.
        </p>
      );
    case 'purchases':
      return (
        <>
          <p className="mb-3">We accept the following payment methods:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>UPI</li>
            <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
            <li>Net Banking</li>
            <li>Cash on Delivery</li>
          </ul>
          <p>
            You agree to provide accurate and complete purchase information. All
            payments are in Indian Rupees (₹). Sales tax/GST will be added as
            applicable. We reserve the right to refuse or cancel any order,
            including orders that appear to be placed by resellers or
            distributors.
          </p>
        </>
      );
    case 'returns':
      return (
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: '#F5F2E8',
            borderLeft: '4px solid #C084C8',
          }}
        >
          <p className="font-semibold mb-3" style={{ color: '#1A1A1A' }}>
            Returns &amp; Refunds Policy:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Unused journals can be returned within 7 days of delivery</li>
            <li>Items must be in original, undamaged packaging</li>
            <li>Used journals cannot be returned</li>
            <li>
              Manufacturing defects covered — contact us within 48 hours of
              delivery with photographs
            </li>
            <li>
              Refunds processed within 5-7 business days to original payment method
            </li>
            <li>Shipping charges are non-refundable</li>
            <li>
              To initiate a return:{' '}
              <a
                href="mailto:info@habimint.com"
                className="underline font-medium"
                style={{ color: '#2D5A27' }}
              >
                info@habimint.com
              </a>
            </li>
          </ul>
        </div>
      );
    case 'prohibited':
      return (
        <>
          <p className="mb-4">
            You may not use the Services for any purpose other than for which we
            make them available. Prohibited activities include:
          </p>
          <ul className="space-y-2">
            {PROHIBITED_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="inline-flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    marginTop: 4,
                  }}
                >
                  <XIcon className="w-3 h-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      );
    case 'contributions':
      return (
        <>
          <p className="mb-3">
            The Services may allow you to post Contributions — including text,
            video, audio, photographs, comments, and reviews. Contributions may be
            viewable by other users and through third-party websites.
          </p>
          <p className="mb-3">
            When posting Contributions, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your Contributions do not infringe any third-party rights</li>
            <li>You own or have rights to the content you post</li>
            <li>You have consent of any identifiable individuals featured</li>
            <li>Your Contributions are not false or misleading</li>
            <li>Your Contributions are not spam or unsolicited advertising</li>
            <li>Your Contributions are not obscene, hateful, or abusive</li>
            <li>Your Contributions comply with all applicable laws</li>
          </ul>
        </>
      );
    case 'contribution-license':
      return (
        <>
          <p className="mb-3">
            By posting Contributions, you grant us an unrestricted, unlimited,
            irrevocable, perpetual, worldwide, royalty-free license to host, use,
            copy, reproduce, sell, publish, broadcast, translate, and distribute
            such Contributions in any media format or channel.
          </p>
          <p>
            You retain full ownership of your Contributions and all associated
            intellectual property rights. We are not liable for any statements in
            your Contributions.
          </p>
        </>
      );
    case 'reviews':
      return (
        <>
          <p className="mb-3">When posting reviews, you must:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Have firsthand experience with the product/entity reviewed</li>
            <li>Not use offensive, profane, or hateful language</li>
            <li>Not make discriminatory references of any kind</li>
            <li>Not reference illegal activity</li>
            <li>Not post false or misleading statements</li>
            <li>Not organize campaigns to manipulate reviews</li>
          </ul>
          <p>
            We may accept, reject, or remove reviews at our sole discretion.
            Reviews do not represent our opinions or those of our affiliates.
          </p>
        </>
      );
    case 'social-media':
      return (
        <>
          <p className="mb-3">
            You may link your account with third-party social media accounts
            (Facebook, Google, etc.). By doing so, you grant us access to certain
            profile information. We use this information only as described in our
            Privacy Policy.
          </p>
          <p>
            We are not responsible for third-party social media providers&rsquo;
            use of your data. You can deactivate the connection at any time
            through your account settings or by contacting{' '}
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
    case 'third-party':
      return (
        <p>
          Our Services may contain links to third-party websites or content. We
          are not responsible for the accuracy, appropriateness, or policies of
          any third-party websites. Accessing third-party websites is at your own
          risk. Purchases made through third-party websites are solely between you
          and that third party.
        </p>
      );
    case 'services-mgmt':
      return (
        <>
          <p className="mb-3">We reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Monitor the Services for violations of these Terms</li>
            <li>Take legal action against violators</li>
            <li>Restrict or disable any Contributions</li>
            <li>Remove content that is excessive or burdensome to systems</li>
            <li>Manage the Services to protect our rights and property</li>
          </ul>
        </>
      );
    case 'privacy':
      return (
        <>
          <p className="mb-3">
            We care about data privacy and security. Please review our Privacy
            Policy at{' '}
            <a
              href="/privacy-policy"
              className="underline"
              style={{ color: '#2D5A27' }}
            >
              habimint.com/privacy-policy
            </a>
            . By using the Services, you agree to be bound by our Privacy Policy,
            which is incorporated into these Terms.
          </p>
          <p>
            The Services are hosted in India. By using our Services from other
            regions, you consent to your data being transferred to and processed
            in India.
          </p>
        </>
      );
    case 'copyright':
      return (
        <p>
          We respect the intellectual property rights of others. If you believe
          any material on our Services infringes your copyright, please notify us
          immediately at{' '}
          <a
            href="mailto:info@habimint.com"
            className="underline"
            style={{ color: '#2D5A27' }}
          >
            info@habimint.com
          </a>
          . Please note that false claims of infringement may result in liability
          under applicable law.
        </p>
      );
    case 'termination':
      return (
        <>
          <p className="mb-3">
            These Legal Terms remain in effect while you use the Services. We
            reserve the right to deny access, terminate accounts, or block users
            at any time without notice for any reason, including breach of these
            Terms.
          </p>
          <p>
            If your account is terminated, you are prohibited from creating a new
            account. We may also pursue appropriate legal action.
          </p>
        </>
      );
    case 'modifications':
      return (
        <>
          <p className="mb-3">
            We reserve the right to change, modify, or remove Services content at
            any time without notice. We may also modify or discontinue the
            Services at any time.
          </p>
          <p>
            We cannot guarantee uninterrupted availability. We are not liable for
            any loss or inconvenience caused by downtime, interruptions, or
            errors.
          </p>
        </>
      );
    case 'law':
      return (
        <p>
          These Legal Terms are governed by the laws of India. Habimint LLP and
          you irrevocably consent to the exclusive jurisdiction of the courts of
          India to resolve any dispute arising in connection with these Legal
          Terms.
        </p>
      );
    case 'disputes':
      return (
        <>
          <h3 className="font-semibold mt-2 mb-2" style={{ color: '#1A1A1A', fontSize: 16 }}>
            Informal Negotiations
          </h3>
          <p className="mb-4">
            Before initiating arbitration, parties agree to first attempt to
            resolve any dispute informally for at least 30 days, commencing upon
            written notice.
          </p>
          <h3 className="font-semibold mt-2 mb-2" style={{ color: '#1A1A1A', fontSize: 16 }}>
            Binding Arbitration
          </h3>
          <p className="mb-4">
            Any dispute arising from these Legal Terms shall be resolved by
            arbitration under the International Commercial Arbitration Court
            under the European Arbitration Chamber. Seat of arbitration: Mumbai,
            India. Language: English. Number of arbitrators: 3. Governing law:
            India.
          </p>
          <h3 className="font-semibold mt-2 mb-2" style={{ color: '#1A1A1A', fontSize: 16 }}>
            Restrictions
          </h3>
          <p className="mb-4">
            All arbitration shall be limited to the individual dispute between
            parties. No class-action arbitration is permitted.
          </p>
          <h3 className="font-semibold mt-2 mb-2" style={{ color: '#1A1A1A', fontSize: 16 }}>
            Exceptions
          </h3>
          <p className="mb-2">The following are NOT subject to arbitration:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Disputes concerning intellectual property rights</li>
            <li>Claims of theft, piracy, or unauthorized use</li>
            <li>Claims for injunctive relief</li>
          </ul>
        </>
      );
    case 'corrections':
      return (
        <p>
          There may be information on our Services that contains typographical
          errors, inaccuracies, or omissions. We reserve the right to correct any
          errors and update information at any time without prior notice.
        </p>
      );
    case 'disclaimer':
      return (
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: '#FEF3C7',
            borderColor: '#FACC15',
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: '#B45309', marginTop: 4 }} />
            <p className="font-semibold" style={{ color: '#92400E' }}>
              Important Disclaimer
            </p>
          </div>
          <p className="mb-3" style={{ color: '#374151' }}>
            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. TO THE
            FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
            OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p style={{ color: '#374151' }}>
            WE MAKE NO WARRANTIES ABOUT THE ACCURACY OR COMPLETENESS OF OUR
            CONTENT AND ASSUME NO LIABILITY FOR ERRORS, PERSONAL INJURY,
            UNAUTHORIZED ACCESS TO OUR SERVERS, INTERRUPTIONS, BUGS, OR ANY LOSS
            OR DAMAGE ARISING FROM USE OF OUR SERVICES.
          </p>
        </div>
      );
    case 'liability':
      return (
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: '#FEF3C7',
            borderColor: '#FACC15',
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: '#B45309', marginTop: 4 }} />
            <p className="font-semibold" style={{ color: '#92400E' }}>
              Liability Limitation
            </p>
          </div>
          <p className="mb-3" style={{ color: '#374151' }}>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL,
            SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, OR
            LOSS OF DATA.
          </p>
          <p style={{ color: '#374151' }}>
            OUR MAXIMUM LIABILITY TO YOU SHALL AT ALL TIMES BE LIMITED TO THE
            AMOUNT PAID BY YOU TO US FOR THE PRODUCT IN QUESTION.
          </p>
        </div>
      );
    case 'indemnification':
      return (
        <>
          <p className="mb-3">
            You agree to defend, indemnify, and hold us harmless — including our
            subsidiaries, affiliates, officers, agents, partners, and employees
            — from any loss, damage, liability, or claim arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your Contributions</li>
            <li>Your use of the Services</li>
            <li>Breach of these Legal Terms</li>
            <li>Violation of any third-party rights</li>
            <li>Any harmful act toward other users</li>
          </ul>
        </>
      );
    case 'user-data':
      return (
        <p>
          We maintain certain data you transmit to manage the Services. Although
          we perform regular backups, you are solely responsible for all data you
          transmit. We have no liability to you for any loss or corruption of
          data.
        </p>
      );
    case 'electronic':
      return (
        <p>
          Visiting the Services, sending emails, and completing online forms
          constitute electronic communications. You consent to receive electronic
          communications and agree that all agreements and notices provided
          electronically satisfy any legal requirement for written communication.
        </p>
      );
    case 'misc':
      return (
        <p>
          These Legal Terms constitute the entire agreement between you and us.
          Our failure to enforce any right shall not constitute a waiver. If any
          provision is found unlawful or unenforceable, the remaining provisions
          remain in full effect. There is no joint venture, partnership, or
          agency relationship created by these Terms.
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
      className="rounded-2xl p-8 mx-auto"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
        border: '1px solid #E5E0D5',
        maxWidth: '32rem',
      }}
    >
      <div className="space-y-5">
        <Row icon={<Mail className="w-5 h-5 text-white" />} label="Email">
          <a href="mailto:info@habimint.com" className="underline" style={{ color: '#2D5A27' }}>
            info@habimint.com
          </a>
        </Row>
        <Row icon={<Phone className="w-5 h-5 text-white" />} label="Phone">
          <a href="tel:+919409610445" style={{ color: '#374151' }}>
            +91 94096 10445
          </a>
        </Row>
        <Row icon={<MapPin className="w-5 h-5 text-white" />} label="Habimint LLP">
          <span style={{ color: '#374151', fontSize: 14, lineHeight: 1.7 }}>
            B-15, JAY JALARAM NAGAR, GADKHOL PATIYA
            <br />
            ANKLESHWAR, GUJARAT 393010, India
          </span>
        </Row>
      </div>

      <a
        href="mailto:info@habimint.com"
        className="mt-6 inline-flex items-center justify-center w-full rounded-full text-white font-semibold transition hover:brightness-110"
        style={{
          backgroundColor: '#2D5A27',
          padding: '12px 24px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 15,
        }}
      >
        Send us an email
      </a>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: '#2D5A27' }}
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold" style={{ color: '#1A1A1A' }}>
          {label}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}
