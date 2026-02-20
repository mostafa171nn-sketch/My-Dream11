'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

type CarouselItem = string | { src: string; name: string; title: string };

const images: CarouselItem[] = [
  { src: '/images/yassin.jpg', name: 'Yassin', title: 'Top Athlete' },
  { src: '/images/khaled.jpg', name: 'Khaled', title: 'Star Swimmer' },
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/8.jpg',
  '/images/whatsapp3.jpg',
  '/images/10.jpg',
  '/images/team.jpeg',
];

const getImageSrc = (item: CarouselItem): string => {
  return typeof item === 'string' ? item : item.src;
};


const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#0f172a] dark:to-[#0f172a]">

      <div className="container mx-auto px-1">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Gallery</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">

            Explore moments captured throughout our journey of excellence
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Image Display */}
          <div className="relative overflow-hidden rounded-2xl shadow-4x2 aspect-[11/9] bg-white">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={getImageSrc(src)}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  quality={90}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute  left-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
        
        </div>

        {/* Thumbnail Strip - visible on laptop screens and above */}
        <div className="hidden lg:flex gap-3 justify-center mt-6 flex-wrap">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-blue-600 ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={getImageSrc(src)}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Champions & Benefits Section - Scrollable */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            🏆 Our Champions & Benefits of Swimming
          </h3>
          
          <div className="max-h-64 overflow-y-auto pr-2 space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-400">🏅 Champion Achievements</h4>
              <p className="text-sm leading-relaxed">
                Our academy has produced numerous champions who have excelled at national and international levels. 
                From winning gold medals at regional championships to representing Egypt in international competitions, 
                our swimmers have proven that dedication and proper training lead to extraordinary results. 
                Champions like Joumana Hamdy, Yousif Shref, and Mostafa Sheta started their journey right here 
                and have become role models for the next generation.
              </p>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-cyan-700 dark:text-cyan-400">💪 Physical Benefits</h4>
              <p className="text-sm leading-relaxed">
                Swimming is one of the most complete physical exercises. It builds cardiovascular endurance, 
                strengthens muscles throughout the entire body, improves flexibility, and enhances coordination. 
                Unlike many sports, swimming is low-impact, making it perfect for all ages while still providing 
                an excellent full-body workout that burns calories and builds lean muscle.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400">🧠 Mental & Health Benefits</h4>
              <p className="text-sm leading-relaxed">
                Regular swimming reduces stress, anxiety, and depression. The rhythmic nature of swimming 
                has a meditative effect on the mind. It also improves sleep quality, boosts immune system 
                function, and promotes better lung capacity. Swimming from a young age builds discipline, 
                time management skills, and self-confidence that extends far beyond the pool.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
              <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">🌊 Life Skills</h4>
              <p className="text-sm leading-relaxed">
                Swimming is an essential life skill that promotes water safety and can save lives. 
                It teaches goal-setting, perseverance through challenges, and the value of consistent practice. 
                Team swimming fosters social skills, sportsmanship, and lifelong friendships. These skills 
                translate to success in academics, careers, and personal relationships.
              </p>
            </div>
          </div>
        </div>



      </div>


      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #00b7b5, #00b7b5, #268f9f);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default PhotoCarousel;
