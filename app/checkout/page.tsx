'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import Checkout from '@/components/checkout/Checkout';


export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment (not used yet), 3: Confirmation



  return (
    <>
      <head>
        <title>{step == 3 ? "Order Confirmed | Habimint" : "Checkout | Habimint"}</title>
        <meta name="description" content={step == 3 ? "Your order has been placed successfully" : "Complete your order at Habimint"} />
      </head>



      <main className="min-h-screen bg-habimint-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  1
                </div>
                <span className="text-sm font-medium text-habimint-text">Delivery</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  2
                </div>
                <span className="text-sm font-medium text-habimint-text">Payment</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  3
                </div>
                <span className="text-sm font-medium text-habimint-text">Confirmation</span>
              </div>
            </div>
          </motion.div>

          {
            step === 3 ? <OrderConfirmation /> : <Checkout step={step} setStep={setStep} />
          }

        </div>
      </main>
    </>
  );
}
