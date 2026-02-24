'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

const Marquee = () => {
  const { t } = useLanguage();

  const items = [
    { text: '🏆 Train hard ' },
    { text: t('Swim fast •') },
    { text: t('Break your limits •') },
    { text: t('Your championship journey starts here 🏊‍♂️') },
  ];

  const desktopItems = items.map(item => item.text).join(' ');
  const mobileItems = items.map(item => item.text).join(' • ');

  return (
    <div 
      className="hidden md:block relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-1 md:py-5"
      dir="ltr"
    >
      {/* Left gradient fade - matching background */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-10 z-1"
        style={{
        }}
      />
      
      {/* Right gradient fade - matching background */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-10 z-1"
        style={{
        }}
      />

      <div className="hidden md:block overflow-hidden">
        <div 
          className="flex whitespace-nowrap items-center"
          style={{
            width: 'fit-content',
            animation: 'marquee-desktop 15s linear infinite',
          }}
        >
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
          <span className="text-white text-lg md:text-xl font-semibold tracking-wide px-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{desktopItems}</span>
        </div>
      </div>

      {/* Mobile - Hidden completely */}
      <div className="hidden overflow-hidden">
        <div 
          className="flex whitespace-nowrap"
          style={{
            width: 'fit-content',
            animation: 'marquee-mobile 20s linear infinite',
          }}
        >
          <span className="text-white text-sm font-medium px-2">{mobileItems}</span>
          <span className="text-white text-sm font-medium px-2">{mobileItems}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-16.66%);
          }
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
    </div>
  );
};

export default Marquee;
