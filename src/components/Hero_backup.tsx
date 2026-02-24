'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t, language } = useLanguage();
  
  const fullText = t('heroText');
  
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('animate-fade-in');
    }

    let index = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (isDeleting) {
        setDisplayText(fullText.substring(0, index - 1));
        index--;
      } else {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      }

      if (!isDeleting && index === fullText.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
        return;
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        timeoutId = setTimeout(type, 1000);
        return;
      }

      const typeSpeed = isDeleting ? 50 : 100;
      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);