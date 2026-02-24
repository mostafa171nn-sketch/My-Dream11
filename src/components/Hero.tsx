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

  return (
    <section className="relative min-h-[86vh] flex md:items-center md:justify-center items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/images/background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 "></div>
      </div>

      <div ref={heroRef} className="relative z-10 md:text-center text-center px-2 md:px-4 max-w-6xl mx-auto w-full overflow-hidden">
        <h1 className="font text-5x1 lg:text-4xl md:text-7xl font-bold mb-4 md:mb-6 overflow-hidden">
          <span className="gradient-text dream ">{t('heroTitle')}</span>
          
          <br />
          <span className="font text-gray-800 dark:text-white">{t('heroSubtitle')}</span>
        </h1>
        
        <div 
          ref={textRef}
          className="inline-block top-20 z-29 mb-2 w-full justify-center items-center overflow-hidden"
          style={{
            transform: `scale(${1 - scrollProgress * 0.2})`,
            opacity: 1 - scrollProgress * 0.6,
            minHeight: '3rem',
          }}
        >
          <span className="text-s md:text-1xl text-gray-300 dark:text-gray-300 mb-20">{displayText}<span className="animate-pulse"></span></span>
        </div>
        
        <div className="flex flex-row  md:gap-4 justify-center items-center mt-1 md:mt-12 w-full max-w-2xl mx-auto" dir="ltr">
          <div className="experience-card w-32 sm:w-40 md:w-64 lg:w-[19rem] h-20 sm:h-24 md:h-40 lg:h-[12rem] duration-500 group relative rounded-l-3xl bg-neutral-300 dark:bg-neutral-700 p-2 md:p-4 flex flex-col justify-center items-center cursor-pointer overflow-hidden">
            <div className="card-inner-experience"></div>
            <div className="circle-experience circle-experience-1"></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full relative">
              <span className="text-lg sm:text-xl md:text-2xl font-black mb-1 text-black dark:text-white">15+</span>
              <span className="text-[6px] sm:text-[8px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">{t('yearsExperience')}</span>
            </div>
          </div>

          <div className="champions-card w-32 sm:w-40 md:w-64 lg:w-[19rem] h-20 sm:h-24 md:h-40 lg:h-[12rem] duration-500 group relative rounded-r-3xl bg-neutral-300 dark:bg-neutral-700 p-2 md:p-4 flex flex-col justify-center items-center cursor-pointer overflow-hidden">
            <div className="card-inner-champions"></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full relative">
              <span className="text-lg sm:text-xl md:text-5xl font-black mb-1 text-black dark:text-white">100+</span>
              <span className="text-[6px] sm:text-[8px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">{t('championsTrained')}</span>
            </div>
          </div>
        </div>

        {/* Mobile Marquee - Visible only on mobile */}
        <div className="flex md:hidden justify-center mt-4">
          <Link 
            href="/contact"
            className="inline-block"
          >
            <div 
              className="marquee-container bg-gradient-to-r m-auto from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 py-2 px-4 rounded-lg shadow-lg whitespace-nowrap overflow-hidden"
            >
              <div className="marquee-content flex items-center">
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
                <span className="text-white font-bold text-sm mx-2">✨ {t('joinUsNow')} ✨</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-row gap-4 justify-center flex-wrap mt-6">
          <Link 
            href="/contact" 
            className="hotly-el-css-button text-sm md:text-base px-4 md:px-8"
          >
            <svg className="star-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            <svg className="star-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            <svg className="star-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            <svg className="star-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            <svg className="star-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            <svg className="star-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
            {t('joinUsNow')}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .marquee-container {
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 20%;
        }
        
        .marquee-container:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(8, 145, 178, 0.4);
        }
        
        .marquee-content {
          animation: marquee-mobile 8s linear infinite;
          display: inline-flex;
        }
        
        @keyframes marquee-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
