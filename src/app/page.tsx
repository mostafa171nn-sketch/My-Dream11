'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Marquee from '@/components/Marquee';
import Hero from '@/components/Hero';
import GridSection from '@/components/GridSection';
import PhotoCarousel from '@/components/PhotoCarousel';
import Loading from '@/components/Loading';
import { useLanguage } from '@/lib/i18n/LanguageContext';
// import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading text={t('loadingText')} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Marquee />
      <Hero />
      <GridSection />
      <PhotoCarousel />
      {/* <Testimonials /> */}

      {/* Making Friends Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-[#1f2937] dark:to-[#111827]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">{t('makingFriends')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              {t('makingFriendsDescription')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-5xl mx-auto">
            <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/frends.jpg"
                alt="Friends at the academy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/freinds1.jpg"
                alt="Friendship through sports"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {t('makingFriendsText')}
            </p>

            <Link
              href="/about"
              className=" mt-6 inline-block bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {t('forDetailsClickHere')}
            </Link>

          </div>

        </div>
      </section>

      {/* Get Details Button at Bottom of Page */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            {t('startYourJourneyToday')}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t('startYourJourneyDescription')}
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}
