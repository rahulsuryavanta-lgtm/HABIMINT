'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SignInContainer from '@/container/SignInContainer/SignInContainer';
import SignupContainer from '@/container/SignUpContainer/SignupContainer';


export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');


  // Redirect if already authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push('/account');
  //   }
  // }, [isAuthenticated, router]);



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
            <div className="text-center mb-8 bg-habimint-primary ">
              <Link href="/">
                <img
                  src="/images/habimint-logo.svg"
                  alt="Habimint"
                  className="w-[100px] mx-auto"
                />
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 pb-3 font-semibold transition-colors relative ${activeTab === 'signin'
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
                className={`flex-1 pb-3 font-semibold transition-colors relative ${activeTab === 'signup'
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

            {/* {true && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sequi magni culpa!
              </motion.div>
            )} */}

            <AnimatePresence mode="wait">
              {/* SIGN IN TAB */}
              {activeTab === 'signin' && (
                <SignInContainer />
              )}

              {/* CREATE ACCOUNT TAB */}
              {activeTab === 'signup' && (
                <SignupContainer />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </>
  );
}
