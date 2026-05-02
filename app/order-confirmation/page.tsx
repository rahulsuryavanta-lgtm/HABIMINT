'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';
import { useCart } from '@/store/cartStore';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-XXXXXXXX';
  const { clearCartItems } = useCart();

  useEffect(() => {
    // Clear cart after successful order
    clearCartItems();
  }, [clearCartItems]);

  return (
    <>
      <head>
        <title>Order Confirmed | Habimint</title>
        <meta name="description" content="Your order has been placed successfully" />
      </head>

      <main className="min-h-screen bg-habimint-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl font-bold text-habimint-text mb-4"
              >
                Order Placed Successfully! 🎉
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-habimint-text-light"
              >
                Thank you for your order. We'll send you a confirmation email shortly.
              </motion.p>
            </motion.div>

            {/* Order Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              {/* Order Number */}
              <div className="text-center pb-6 mb-6 border-b border-gray-200">
                <p className="text-sm text-habimint-text-light mb-2">Order Number</p>
                <p className="font-heading text-2xl font-bold text-habimint-primary">{orderId}</p>
              </div>

              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-habimint-text mb-1">Estimated Delivery</h3>
                    <p className="text-sm text-habimint-text-light">
                      Your order will arrive in 3-5 business days
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-habimint-text mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-habimint-text-light">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>You'll receive an order confirmation email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>We'll notify you when your order is shipped</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>You can track your order from your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>Payment will be collected on delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/account">
                <button className="w-full sm:w-auto px-8 py-3 bg-habimint-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Track Order
                </button>
              </Link>
              <Link href="/shop">
                <button className="w-full sm:w-auto px-8 py-3 border-2 border-habimint-primary text-habimint-primary rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Continue Shopping
                </button>
              </Link>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-habimint-text-light mb-2">
                Need help with your order?
              </p>
              <Link
                href="/faq"
                className="text-habimint-primary hover:underline font-medium"
              >
                Visit our FAQ →
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-habimint-primary"></div></div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
