'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  Tag,
  LogOut,
  Mail,
  Phone,
  ShoppingBag,
  Copy,
  Check,
} from 'lucide-react';
import { useAuth } from '@/store/authStore';

type TabType = 'profile' | 'orders' | 'wishlist' | 'coupons';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  
  // Profile edit state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Mock data
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME10', discount: '10%', expiry: '30 Apr 2026', description: 'Get 10% off on your first order' },
    { code: 'FREESHIP', discount: 'Free Shipping', expiry: '31 Dec 2026', description: 'Free shipping on orders above ₹999' },
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      // TODO: Connect to actual API
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData),
      // });
      
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-habimint-primary mx-auto mb-4"></div>
          <p className="text-habimint-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const sidebarItems = [
    { id: 'profile' as TabType, label: 'My Profile', icon: User },
    { id: 'orders' as TabType, label: 'My Orders', icon: Package },
    { id: 'wishlist' as TabType, label: 'Wishlist', icon: Heart },
    { id: 'coupons' as TabType, label: 'My Coupons', icon: Tag },
  ];

  return (
    <>
      <head>
        <title>My Account | Habimint</title>
        <meta name="description" content="Manage your Habimint account, orders, and wishlist" />
      </head>

      <main className="min-h-screen bg-habimint-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
              >
                {/* User Avatar & Info */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-20 h-20 rounded-full bg-habimint-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-habimint-text mb-1">
                    {user.name}
                  </h2>
                  <p className="text-sm text-habimint-text-light">{user.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 mb-6">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          activeTab === item.id
                            ? 'bg-habimint-primary text-white'
                            : 'text-habimint-text hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Sign Out */}
                <button
                  onClick={() => setShowSignOutDialog(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </motion.div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
              >
                <AnimatePresence mode="wait">
                  {/* PROFILE TAB */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-heading text-3xl font-bold text-habimint-text mb-6">
                        My Profile
                      </h2>

                      <div className="space-y-4 max-w-xl">
                        <div>
                          <label className="block text-sm font-medium text-habimint-text mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) =>
                                setProfileData({ ...profileData, name: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                              placeholder="Your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-habimint-text mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) =>
                                setProfileData({ ...profileData, email: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-habimint-text mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) =>
                                setProfileData({ ...profileData, phone: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary"
                              placeholder="10-digit number"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleSaveProfile}
                          disabled={isSavingProfile}
                          className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70"
                        >
                          {isSavingProfile ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ORDERS TAB */}
                  {activeTab === 'orders' && (
                    <motion.div
                      key="orders"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-heading text-3xl font-bold text-habimint-text mb-6">
                        My Orders
                      </h2>

                      {orders.length === 0 ? (
                        <div className="text-center py-16">
                          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="font-heading text-2xl font-bold text-habimint-text mb-3">
                            No orders yet
                          </h3>
                          <p className="text-habimint-text-light mb-6">
                            Start your wellness journey by ordering your first journal
                          </p>
                          <Link href="/shop">
                            <button className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                              Shop Now
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Order cards would go here */}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* WISHLIST TAB */}
                  {activeTab === 'wishlist' && (
                    <motion.div
                      key="wishlist"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-heading text-3xl font-bold text-habimint-text mb-6">
                        Wishlist
                      </h2>

                      {wishlist.length === 0 ? (
                        <div className="text-center py-16">
                          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <Heart className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="font-heading text-2xl font-bold text-habimint-text mb-3">
                            No saved items
                          </h3>
                          <p className="text-habimint-text-light mb-6">
                            Save your favorite journals to buy them later
                          </p>
                          <Link href="/shop">
                            <button className="bg-habimint-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                              Browse Products
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Wishlist items would go here */}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* COUPONS TAB */}
                  {activeTab === 'coupons' && (
                    <motion.div
                      key="coupons"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="font-heading text-3xl font-bold text-habimint-text mb-6">
                        My Coupons
                      </h2>

                      <div className="space-y-4">
                        {coupons.map((coupon, index) => (
                          <div
                            key={index}
                            className="border-2 border-dashed border-habimint-primary rounded-2xl p-6 bg-green-50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <code className="bg-habimint-primary text-white px-4 py-2 rounded-lg font-bold text-lg">
                                    {coupon.code}
                                  </code>
                                  <span className="bg-habimint-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {coupon.discount}
                                  </span>
                                </div>
                                <p className="text-sm text-habimint-text">{coupon.description}</p>
                              </div>
                              <button
                                onClick={() => handleCopyCode(coupon.code)}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-habimint-primary text-habimint-primary rounded-full hover:bg-habimint-primary hover:text-white transition"
                              >
                                {copiedCode === coupon.code ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-xs text-habimint-text-light">
                              Valid until {coupon.expiry}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Sign Out Confirmation Dialog */}
        {showSignOutDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="font-heading text-2xl font-bold text-habimint-text mb-3">
                Sign Out?
              </h3>
              <p className="text-habimint-text-light mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignOutDialog(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full font-semibold text-habimint-text hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
