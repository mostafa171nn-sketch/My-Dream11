'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import LoadingLink from './LoadingLink';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setIsHidden(scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    document.body.style.backgroundColor = newIsDark ? '#0a0a0a' : '#ffffff';
    document.body.style.color = newIsDark ? '#ffffff' : '#171717';
  };

  return (
    <nav className={`bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg sticky top-0 z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-2">
        {/* Mobile Nav - Logo centered with links below */}
        <div className="md:hidden flex flex-col items-center py-1 relative" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Language Switcher - Right in English, Left in Arabic */}
          <div className={`absolute top-6 ${isRTL ? 'left-2 right-2' : 'right-2 left-2'}`}>
            <div className="scale-90">
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Dark Mode Toggle - Top right corner - Clickable text */}
          <div 
            className="absolute top-5 right-5 cursor-pointer bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors duration-300"
            onClick={toggleDarkMode}
          >
            <span className="text-xs font-medium">{isDark ? (isRTL ? 'الوضع الفاتح' : 'Light Mode') : (isRTL ? 'الوضع الداكن' : 'Dark Mode')}</span>
          </div>
          
          {/* Logo Only - No Text on Mobile */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logoo.jpeg" 
              alt="My Dream Academy Logo" 
              className="w-15 h-15 rounded-full mb-2 mt-5 object-cover ring-1 ring-white/30 group-hover:ring-white/60 transition-all duration-300"
            />
          </Link>
          
          {/* Links in a row */}
          <div className={`flex items-center gap-2 mb-5 mt-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              href="/" 
              className="hover:text-cyan-200 transition-colors duration-300 text-xs font-medium flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="hover:text-cyan-200 transition-colors duration-300 text-xs font-medium flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('details')}
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-cyan-200 transition-colors duration-300 text-xs font-medium flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('contactUs')}
            </Link>
          </div>
        </div>

        {/* Desktop Nav - Logo and Menu in one row */}
        <div className={`hidden md:flex justify-between items-center py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center space-x-3 group ${isRTL ? 'flex-row-reverse' : ''}`}>
            <img 
              src="/logoo.jpeg" 
              alt="My Dream Academy Logo" 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-300"
            />
            <span className="text-2xl font-bold">
            My <span className='colorr'>Dream </span> Academy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className={`flex items-center space-x-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
            <Link 
              href="/contact" 
              className="px-4 py-2 text-sm font-medium hover:text-cyan-200 transition-colors duration-300 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{t('contactUs')}</span>
            </Link>
            
            {/* Language Switcher - Desktop */}
            <div className={isRTL ? 'mr-4 ml-0' : 'ml-4 mr-0'}>
              <LanguageSwitcher />
            </div>
            
            {/* Dark Mode Toggle - Desktop */}
            <div className={isRTL ? 'mr-2 ml-0' : 'ml-2 mr-0'}>
              <ThemeToggle id="desktop-toggle" isDark={isDark} onToggle={toggleDarkMode} />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
     

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-400">
            {/* Logo and Title in Center */}
            <div className="flex flex-col items-center justify-center mb-4">
              <Link href="/" className="flex flex-col items-center group" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/logoo.jpeg" 
                  alt="My Dream Academy Logo" 
                  className="w-16 h-16 rounded-full object-cover mb-2 ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-300"
                />
                <span className="text-xl font-bold">
                  My <span className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/60 via-cyan-400/60 to-blue-600/60 backdrop-blur-md border border-white/40 shadow-lg">Dream</span> Academy
                </span>
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
              <Link 
                href="/contact" 
                className="hover:text-cyan-200 transition-colors duration-300 flex items-center justify-center space-x-2 py-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{t('contactUs')}</span>
              </Link>
              
              {/* Language Switcher - Mobile Menu */}
              <div className="flex items-center justify-center bg-white/10 px-4 py-3 rounded-lg mt-2">
                <span className={`text-sm font-medium ${isRTL ? 'ml-2' : 'mr-2'}`}>{isRTL ? 'اللغة' : 'Language'}</span>
                <LanguageSwitcher />
              </div>
              
              {/* Dark Mode Toggle - Full Width */}
              <div className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-lg mt-2">
                <span className="text-sm font-medium">{t('darkMode')}</span>
                <ThemeToggle id="mobile-menu-toggle" isDark={isDark} onToggle={toggleDarkMode} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
