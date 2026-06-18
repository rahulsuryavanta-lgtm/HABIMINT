// Navbar Component for Habimint
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, LogIn } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { NAVIGATION_LINKS } from '@/lib/constants/constants';
import { UserCookieData_Int } from '@/interface/ProfileInt';
import { getUserInfo } from '@/utils/getToken';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalCartQty } from '@/stores/productCartSlice';
import { RootState } from '@/stores';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart_total } = useSelector(
    (state: RootState) => state.productCartSlice
  );

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Determine colors based on scroll state
  const linkColor = isScrolled ? 'text-habimint-primary-light' : 'text-white';
  const hoverColor = 'hover:text-white';

  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserCookieData_Int>({} as any);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const pathname = usePathname();
  const [openNewsModal, setNewsModal] = useState(false);

  // useEffect(() => {
  //     let isHeaderElement = document.getElementById('header-parent');
  //     if (isHeaderElement) {
  //         const isHeaderBoundary = isHeaderElement.getBoundingClientRect();
  //         setHeaderHt(isHeaderBoundary.height);
  //     }

  // }, [])

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo?.id) {
      dispatch(fetchTotalCartQty({}));
      setUserData(userInfo);
    }

    let timeoutId: NodeJS.Timeout;
    if (!localStorage.getItem("is_subscribed") && !userInfo?.id) {
      timeoutId = setTimeout(() => {
        setNewsModal(true);
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-habimint-primary shadow-md' : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/habimint-logo.svg"
                alt="Habimint"
                width={180}
                height={60}
                priority
                className="h-auto w-[140px] sm:w-[160px] md:w-[180px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${linkColor} ${hoverColor} transition-colors font-medium relative group`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-3 md:gap-4">
              {/* Search Icon - hidden on very small screens */}
              <button
                className="hidden sm:block p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
              </button>

              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ShoppingCart className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
                {cart_total?.cart_qty > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-habimint-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cart_total?.cart_qty}
                  </motion.span>
                )}
              </Link>

              {/* User Icon */}
              <Link
                href={userData?.id ? '#' : '/login'}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {
                  userData?.id ?
                    <User className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
                    :
                    <LogIn className={`w-5 h-5 ${linkColor} ${hoverColor} transition-colors`} />
                }
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${linkColor}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${linkColor}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content - Full screen drawer */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-habimint-primary shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              {/* Drawer header with close button */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="text-white font-heading text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-2 flex-1 overflow-y-auto">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center min-h-[48px] py-3 px-4 text-lg font-medium text-habimint-primary-light hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Quick legal links */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
                  <Link
                    href="/privacy-policy"
                    className="block py-2 px-4 text-sm text-habimint-primary-light/80 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-condition"
                    className="block py-2 px-4 text-sm text-habimint-primary-light/80 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};