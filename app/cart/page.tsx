'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Lock, Truck, Tag } from 'lucide-react';
import { useCart } from '@/store/cartStore';

export default function CartPage() {
  const { cart, fetchCart, updateItem, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = cart?.subtotal || 0;
  const deliveryFee = subtotal >= 1499 ? 0 : 99;
  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateItem(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = async () => {
    setApplyingCoupon(true);
    setCouponError('');
    try {
      // TODO: Connect to actual API
      // const response = await fetch('/api/coupon/apply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code: couponCode }),
      // });
      // const data = await response.json();
      // if (data.valid) {
      //   setDiscount(data.discountAmount);
      // } else {
      //   setCouponError('Invalid coupon code');
      // }

      // Mock validation
      if (couponCode.toUpperCase() === 'WELCOME10') {
        setDiscount(subtotal * 0.1);
      } else {
        setCouponError('Invalid coupon code');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon');
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Empty Cart State
  if (!cart || cart.items.length === 0) {
    return (
      <>
        <head>
          <title>Shopping Cart | Habimint</title>
          <meta name="description" content="View your shopping cart at Habimint" />
        </head>
        <main className="min-h-screen bg-habimint-bg pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h1 className="font-heading text-4xl font-bold text-habimint-text mb-4">
                Your cart is empty
              </h1>
              <p className="text-habimint-text-light text-lg mb-8">
                Looks like you haven't added anything yet
              </p>
              <Link href="/shop">
                <button className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                  Start Shopping →
                </button>
              </Link>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <head>
        <title>Shopping Cart ({cart.items.length} items) | Habimint</title>
        <meta name="description" content="Review your cart and proceed to checkout" />
      </head>

      <main className="min-h-screen bg-habimint-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-bold text-habimint-text text-center mb-12"
          >
            Your Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* LEFT - Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                {cart.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-4 py-6"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={item.product.image || '/images/fall-forward-hero.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-semibold text-habimint-text mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-habimint-text-light mb-3">
                          {item.product.tagline || 'Premium wellness journal'}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-habimint-primary font-bold">₹{item.price}</span>
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-gray-50 transition disabled:opacity-40"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="p-2 hover:bg-gray-50 transition disabled:opacity-40"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line Total & Remove */}
                      <div className="text-right flex flex-col justify-between items-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition p-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="font-heading text-xl font-bold text-habimint-text">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </motion.div>

                    {index < cart.items.length - 1 && (
                      <div className="border-t border-gray-200" />
                    )}
                  </React.Fragment>
                ))}

                {/* Continue Shopping */}
                <div className="pt-6 border-t border-gray-200 mt-6">
                  <Link
                    href="/shop"
                    className="text-habimint-primary hover:underline font-medium inline-flex items-center gap-2"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
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

                {/* Subtotal */}
                <div className="flex justify-between mb-3">
                  <span className="text-habimint-text-light">Subtotal</span>
                  <span className="font-semibold text-habimint-text">₹{subtotal}</span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between mb-3">
                  <span className="text-habimint-text-light">Delivery</span>
                  <span className="font-semibold text-habimint-text">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {/* Coupon Code */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-habimint-text mb-2">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-habimint-primary text-sm"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || applyingCoupon}
                      className="px-4 py-2 bg-habimint-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition text-sm disabled:opacity-50"
                    >
                      {applyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-xs mt-1">{couponError}</p>
                  )}
                  {discount > 0 && (
                    <div className="flex items-center justify-between mt-3 text-green-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>Coupon Applied</span>
                      </div>
                      <span className="font-semibold">-₹{discount.toFixed(0)}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="font-heading text-xl font-bold text-habimint-text">Total</span>
                  <span className="font-heading text-2xl font-bold text-habimint-primary">
                    ₹{total.toFixed(0)}
                  </span>
                </div>

                {/* Proceed to Checkout */}
                <Link href="/checkout">
                  <button className="w-full bg-habimint-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition mb-4">
                    Proceed to Checkout →
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                    <Lock className="w-4 h-4 text-habimint-primary" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                    <Truck className="w-4 h-4 text-habimint-primary" />
                    Free delivery above ₹1,499
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
