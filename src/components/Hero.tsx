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
    // GSAP animations would go here
    // For now, we'll use CSS animations
    if (heroRef.current) {
      heroRef.current.classList.add('animate-fade-in');
    }

    // Typewriter effect
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
        // Wait 2 seconds before deleting
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
        return;
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        // Wait 1 second before typing again
        timeoutId = setTimeout(type, 1000);
        return;
      }

      const typeSpeed = isDeleting ? 50 : 100;
      timeoutId = setTimeout(type, typeSpeed);
    };

    // Start typing after a brief delay
    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Scroll effect for typewriter text
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
      {/* Background with image */}
      <div className="absolute inset-0">
        <img 
          src="/images/background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 "></div>
      </div>
      
      {/* Animated background elements */}
      

      {/* Content */}
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
            href="/about" 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Get Details
          </Link>
          <Link 
            href="/contact" 
            className="border-2 border-blue-600 text-blue-800 dark:border-white dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Jouin us now
          </Link>
        </div>

        {/* Two Cards Section */}
        <div className="flex flex-row gap-2 justify-center mt-12">
          {/* Card 1 - Experience Stat */}
          <div className="w-40 md:w-64 h-40 duration-500 group overflow-hidden relative rounded-l-3xl bg-neutral-300 dark:bg-neutral-700 p-4 flex flex-col justify-center items-center">
            <div className="absolute blur duration-500 group-hover:blur-none w-32 h-32 md:w-72 md:h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-20 h-20 md:w-36 md:h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-16 h-16 md:w-24 md:h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full">
              <span className="text-3xl md:text-5xl font-black mb-1 text-black dark:text-white">15+</span>
              <span className="text-[10px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">Years Experience</span>
            </div>
          </div>

          {/* Card 2 - Champions Stat */}
          <div className="w-40 md:w-64 h-40 duration-500 group overflow-hidden relative rounded-r-3xl bg-neutral-300 dark:bg-neutral-700 p-4 flex flex-col justify-center items-center">
            <div className="absolute blur duration-500 group-hover:blur-none w-32 h-32 md:w-72 md:h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-sky-900 right-1 -bottom-24"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-20 h-20 md:w-36 md:h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-800 right-1 -top-12"></div>
            <div className="absolute blur duration-500 group-hover:blur-none w-16 h-16 md:w-24 md:h-24 bg-sky-700 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-10 flex flex-col justify-center items-center w-full h-full">
              <span className="text-3xl md:text-5xl font-black mb-1 text-black dark:text-white">100+</span>
              <span className="text-[10px] md:text-sm font-bold text-black dark:text-white uppercase tracking-wider text-center">Champions Trained</span>
            </div>
          </div>


        </div>

        {/* Stats Section */}
        
      </div>

      {/* Scroll indicator */}
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

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

export default Hero;
