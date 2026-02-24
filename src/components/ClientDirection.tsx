'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useState, useEffect } from 'react';

export default function ClientDirection({ children }: { children: React.ReactNode }) {
  const { isRTL } = useLanguage();
  const [direction, setDirection] = useState('ltr');
  
  useEffect(() => {
    // Check if we're on mobile (screen width < 768px)
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      setDirection(isMobile ? 'ltr' : (isRTL ? 'rtl' : 'ltr'));
    };
    
    // Initial check
    checkScreenSize();
    
    // Listen for resize
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isRTL]);
  
  return (
    <div dir={direction} className={direction}>
      {children}
    </div>
  );
}
