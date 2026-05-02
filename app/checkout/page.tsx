'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Truck } from 'lucide-react';
import { useCart } from '@/store/cartStore';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, fetchCart } = useCart();
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment (not used yet), 3: Confirmation
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    deliveryMethod: 'standard', // 'standard' or 'express'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart && cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  const subtotal = cart?.subtotal || 0;
  const deliveryFee = formData.deliveryMethod === 'express' ? 199 : subtotal >= 1499 ? 0 : 99;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits)';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode (6 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setPlacingOrder(true);
    try {
      // TODO: Connect to actual API
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     cartItems: cart?.items,
      //     subtotal,
      //     deliveryFee,
      //     total,
      //   }),
      // });
      // const data = await response.json();
      // if (data.success) {
      //   router.push(`/order-confirmation?orderId=${data.orderId}`);
      // }

      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Redirect to confirmation page with mock order ID
      router.push(`/order-confirmation?orderId=ORD-${Date.now()}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-habimint-primary mx-auto mb-4"></div>
          <p className="text-habimint-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Checkout | Habimint</title>
        <meta name="description" content="Complete your order at Habimint" />
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium text-habimint-text">Delivery</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium text-habimint-text">Payment</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? 'bg-habimint-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium text-habimint-text">Confirmation</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* LEFT - Delivery Details Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
              >
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-habimint-text mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-habimint-text mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="10-digit number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                          errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="House/Flat no., Building name"
                      />
                      {errors.addressLine1 && (
                        <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                        placeholder="Street, Area, Landmark"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-habimint-text mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="City"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-habimint-text mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-habimint-text mb-2">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          maxLength={6}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            errors.pincode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="6 digits"
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                    Delivery Method
                  </h2>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                        formData.deliveryMethod === 'standard'
                          ? 'border-habimint-primary bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-habimint-primary"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-habimint-text">Standard Delivery</div>
                        <div className="text-sm text-habimint-text-light">3-5 business days</div>
                      </div>
                      <div className="font-bold text-habimint-text">
                        {subtotal >= 1499 ? 'Free' : '₹99'}
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                        formData.deliveryMethod === 'express'
                          ? 'border-habimint-primary bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-habimint-primary"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-habimint-text">Express Delivery</div>
                        <div className="text-sm text-habimint-text-light">1-2 business days</div>
                      </div>
                      <div className="font-bold text-habimint-text">₹199</div>
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
              >
                <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={item.product.image || '/images/fall-forward-hero.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-habimint-text mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-habimint-text-light mb-1">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-habimint-primary">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-habimint-text-light">Subtotal</span>
                    <span className="font-semibold text-habimint-text">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-habimint-text-light">Delivery</span>
                    <span className="font-semibold text-habimint-text">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-heading text-xl font-bold text-habimint-text">Total</span>
                    <span className="font-heading text-2xl font-bold text-habimint-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="w-full bg-habimint-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed mb-4"
                >
                  {placingOrder ? 'Placing Order...' : 'Place Order'}
                </button>

                {/* Payment Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    💰 Payment will be collected on delivery
                  </p>
                  {/* TODO: Backend to integrate Razorpay here */}
                </div>

                {/* Trust Badges */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-habimint-text-light">
                    <Lock className="w-4 h-4 text-habimint-primary" />
                    Secure & encrypted checkout
                  </div>
                  <div className="flex items-center gap-2 text-xs text-habimint-text-light">
                    <Truck className="w-4 h-4 text-habimint-primary" />
                    Tracked delivery to your doorstep
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
