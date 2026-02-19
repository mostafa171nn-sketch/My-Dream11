'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const fullText = 'Transform your dreams into reality';
  
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
  }, []);

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/images/background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 "></div>
      </div>

      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">MY Dream</span>
          <br />
          <span className="text-gray-800 dark:text-white">Academy</span>
        </h1>
        
        <div 
          ref={textRef}
          className="sticky top-28 z-40 w-full flex justify-center items-center"
          style={{
            transform: `scale(${1 - scrollProgress * 0.2})`,
            opacity: 1 - scrollProgress * 0.6,
            minHeight: '3rem',
          }}
        >
          <span className="text-xl md:text-2xl text-gray-300 dark:text-gray-300">{displayText}<span className="animate-pulse"></span></span>
        </div>
        
        <div className="mt-10"></div>
        
        <div className="flex flex-row gap-4 justify-center">
         
          <Link 
            href="/contact" 
            className="hotly-el-css-button"
          >
            {/* Star elements */}
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
            Join us now
          </Link>
        </div>

        <div className="flex flex-row g md:gap-4 justify-center mt-12">
<div className="experience-card w-29 md:w-64 lg:w-[19rem] h-28 md:h-40 lg:h-[12rem] duration-500 group relative rounded-l-3xl bg-neutral-300 dark:bg-neutral-700 p-2 md:p-4 flex flex-col justify-center items-center cursor-pointer">
            <div className="card-inner-experience"></div>
            <div className="circle-experience circle-experience-1"></div>
            <div className=""></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full relative">
              <span className="text-2xl md:text-x1 font-black mb-1 text-black dark:text-white">15+</span>
              <span className="text-[10px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">Years Experience</span>
            </div>
          </div>

<div className="champions-card w-40 md:w-64 lg:w-[19rem] h-28 md:h-40 lg:h-[12rem] duration-500 group relative rounded-r-3xl bg-neutral-300 dark:bg-neutral-700 p-2 md:p-4 flex flex-col justify-center items-center cursor-pointer">
            <div className="card-inner-champions"></div>
            <div className="1"></div>
            <div className=""></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full relative">
              <span className="text-2xl md:text-5xl font-black mb-1 text-black dark:text-white">100+</span>
              <span className="text-[10px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">Champions Trained</span>
            </div>
          </div>
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
      `}</style>
    </section>
  );
};

export default Hero;
