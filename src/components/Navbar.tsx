'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import LoadingLink from './LoadingLink';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  return (
    <nav className={`bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Mobile Nav - Logo centered with links below */}
        <div className="md:hidden flex flex-col items-center py-9 relative">
          {/* Dark Mode - Left in English, Right in Arabic */}
          <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'}`}>
            <button 
              onClick={() => {
                // Trigger theme toggle by clicking the hidden checkbox
                const checkbox = document.getElementById('mobile-theme-toggle') as HTMLInputElement;
                if (checkbox) {
                  checkbox.click();
                }
              }}
              className="flex items-center px-2 py-2 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span>{t('darkMode')}</span>
            </button>
            {/* Hidden theme toggle for mobile - used programmatically */}
            <div className="absolute top-full left-0 z-[-1] opacity-0">
              <ThemeToggle id="mobile-theme-toggle" />
            </div>
          </div>

          {/* Language Switcher - Right in English, Left in Arabic */}
          <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}>
            <div className="scale-75">
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Logo and Title Centered */}
          <Link href="/" className="flex flex-col items-center mb-2">
            <img 
              src="/logoo.jpeg" 
              alt="My Dream Academy Logo" 
              className="w-16 h-16 rounded-full object-cover mb-1"
            />
            <span className="text-lg font-bold">My Dream Academy</span>
          </Link>
          
          {/* Links in a row */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="hover:text-cyan-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="hover:text-cyan-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('details')}
            </Link>
            <LoadingLink 
              href="/contact" 
              targetContact={true}
              className="hover:text-cyan-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('contactUs')}
            </LoadingLink>
          </div>
        </div>

        {/* Desktop Nav - Logo and Menu in one row */}
        <div className="hidden md:flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/logoo.jpeg" 
              alt="My Dream Academy Logo" 
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-2xl font-bold">My Dream Academy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium hover:text-cyan-200 transition-colors duration-300 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{t('home')}</span>
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-sm font-medium hover:text-cyan-200 transition-colors duration-300 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('details')}</span>
            </Link>
            <LoadingLink 
              href="/contact" 
              targetContact={true}
              className="px-4 py-2 text-sm font-medium hover:text-cyan-200 transition-colors duration-300 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{t('contactUs')}</span>
            </LoadingLink>
            
            {/* Language Switcher - Desktop */}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
            
            {/* Dark Mode Toggle - Desktop */}
            <div className="ml-2 scale-[0.75]">
              <ThemeToggle id="desktop-toggle" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-400">
            {/* Logo and Title in Center */}
            <div className="flex flex-col items-center justify-center mb-4">
              <Link href="/" className="flex flex-col items-center" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/logoo.jpeg" 
                  alt="My Dream Academy Logo" 
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
                <span className="text-xl font-bold">Dream Academy</span>
              </Link>
            </div>
            
            {/* Links Below */}
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="hover:text-cyan-200 transition-colors duration-300 flex items-center justify-center space-x-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{t('home')}</span>
              </Link>
              <Link 
                href="/about" 
                className="hover:text-cyan-200 transition-colors duration-300 flex items-center justify-center space-x-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('details')}</span>
              </Link>
              <LoadingLink 
                href="/contact" 
                targetContact={true}
                className="hover:text-cyan-200 transition-colors duration-300 flex items-center justify-center space-x-2 py-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{t('contactUs')}</span>
              </LoadingLink>
              
              {/* Language Switcher - Mobile Menu */}
              <div className="flex items-center justify-center bg-white/10 px-4 py-3 rounded-lg mt-2">
                <span className="text-sm font-medium ml-2">{isRTL ? 'اللغة' : 'Language'}</span>
                <LanguageSwitcher />
              </div>
              
              {/* Dark Mode Toggle - Full Width */}
              <div className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-lg mt-2">
                <span className="text-sm font-medium">{t('darkMode')}</span>
                <ThemeToggle id="mobile-menu-toggle" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
