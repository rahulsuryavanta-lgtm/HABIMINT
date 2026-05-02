'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { useAuth } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Sign In form
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  // Sign Up form
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear error when switching tabs
    clearError();
    setFormErrors({});
  }, [activeTab, clearError]);

  const validateSignIn = () => {
    const errors: Record<string, string> = {};
    
    if (!signInData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!signInData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = () => {
    const errors: Record<string, string> = {};
    
    if (!signUpData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!signUpData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!signUpData.password) {
      errors.password = 'Password is required';
    } else if (signUpData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!signUpData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signUpData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;
    
    try {
      await login(signInData.email, signInData.password);
      // Redirect happens via useEffect
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;
    
    try {
      await register(signUpData.email, signUpData.password, signUpData.fullName);
      // Redirect happens via useEffect
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: NextAuth Google provider integration
    console.log('Google Sign In clicked');
    alert('Google Sign In will be integrated with NextAuth');
  };

  return (
    <>
      <head>
        <title>{activeTab === 'signin' ? 'Sign In' : 'Create Account'} | Habimint</title>
        <meta name="description" content="Sign in to your Habimint account or create a new one" />
      </head>

      <main className="min-h-screen bg-habimint-bg flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/">
                <img
                  src="/images/habimint-logo.svg"
                  alt="Habimint"
                  className="h-12 mx-auto mb-4"
                />
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 pb-3 font-semibold transition-colors relative ${
                  activeTab === 'signin'
                    ? 'text-habimint-primary'
                    : 'text-habimint-text-light hover:text-habimint-text'
                }`}
              >
                Sign In
                {activeTab === 'signin' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-habimint-primary"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 pb-3 font-semibold transition-colors relative ${
                  activeTab === 'signup'
                    ? 'text-habimint-primary'
                    : 'text-habimint-text-light hover:text-habimint-text'
                }`}
              >
                Create Account
                {activeTab === 'signup' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-habimint-primary"
                  />
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* SIGN IN TAB */}
              {activeTab === 'signin' && (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading text-3xl font-bold text-habimint-text mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-habimint-text-light mb-6">
                    Continue your journey from Aham to Ananta
                  </p>

                  {/* Google Sign In */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-full font-semibold text-habimint-text hover:bg-gray-50 transition mb-6"
                  >
                    <Chrome className="w-5 h-5" />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-habimint-text-light">or continue with email</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Sign In Form */}
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={signInData.email}
                          onChange={(e) => {
                            setSignInData({ ...signInData, email: e.target.value });
                            setFormErrors({ ...formErrors, email: '' });
                          }}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signInData.password}
                          onChange={(e) => {
                            setSignInData({ ...signInData, password: e.target.value });
                            setFormErrors({ ...formErrors, password: '' });
                          }}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                      )}
                    </div>

                    <div className="text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-habimint-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* CREATE ACCOUNT TAB */}
              {activeTab === 'signup' && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading text-3xl font-bold text-habimint-text mb-2">
                    Start Your Journey
                  </h2>
                  <p className="text-habimint-text-light mb-6">
                    From Aham to Ananta — your transformation begins here
                  </p>

                  {/* Google Sign Up */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-full font-semibold text-habimint-text hover:bg-gray-50 transition mb-6"
                  >
                    <Chrome className="w-5 h-5" />
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-habimint-text-light">or continue with email</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Sign Up Form */}
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={signUpData.fullName}
                          onChange={(e) => {
                            setSignUpData({ ...signUpData, fullName: e.target.value });
                            setFormErrors({ ...formErrors, fullName: '' });
                          }}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={signUpData.email}
                          onChange={(e) => {
                            setSignUpData({ ...signUpData, email: e.target.value });
                            setFormErrors({ ...formErrors, email: '' });
                          }}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signUpData.password}
                          onChange={(e) => {
                            setSignUpData({ ...signUpData, password: e.target.value });
                            setFormErrors({ ...formErrors, password: '' });
                          }}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-habimint-text mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={signUpData.confirmPassword}
                          onChange={(e) => {
                            setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                            setFormErrors({ ...formErrors, confirmPassword: '' });
                          }}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${
                            formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signUpData.agreeToTerms}
                          onChange={(e) => {
                            setSignUpData({ ...signUpData, agreeToTerms: e.target.checked });
                            setFormErrors({ ...formErrors, agreeToTerms: '' });
                          }}
                          className="mt-1 w-4 h-4 text-habimint-primary rounded focus:ring-2 focus:ring-habimint-primary"
                        />
                        <span className="text-sm text-habimint-text-light">
                          I agree to the{' '}
                          <Link href="/terms" className="text-habimint-primary hover:underline">
                            Terms & Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-habimint-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {formErrors.agreeToTerms && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.agreeToTerms}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </>
  );
}
