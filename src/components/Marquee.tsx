'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

const Marquee = () => {
  const { t } = useLanguage();
  
  // Individual items without extra spacing
  const items = [
    `🏆 ${t('bestTrainingAcademy')} 🏆`,
    `💪 ${t('joinOurProgramsToday')} 💪`,
    `🌟 ${t('achieveYourGoals')} 🌟`,
    `🎯 ${t('expertCoaching')} 🎯`,
    `🚀 ${t('startYourJourney')} 🚀`,
    `✨ ${t('transformYourDreams')} ✨`,
  ];
  
  const desktopItems = items.join('');
  const mobileItems = items.join('');
  
  return (
    <div 
      className="overflow-hidden  bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-800 dark:to-gray-900 py-2 md:py-4"
      dir="ltr"
      style={{ direction: 'ltr', textAlign: 'left' }}
    >
      {/* Desktop - Seamless continuous scrolling */}
      <div className="hidden md:block overflow-hidden">
        <div 
          className="flex whitespace-nowrap"
          style={{
            width: 'fit-content',
            animation: 'marquee-desktop 30s linear infinite',
            direction: 'ltr',
            textAlign: 'left',
          }}
        >
          <span className="text-white text-xl font-bold" style={{ direction: 'ltr' }}>{desktopItems}</span>
          <span className="text-white text-xl font-bold" style={{ direction: 'ltr' }}>{desktopItems}</span>
        </div>
      </div>

      {/* Mobile - Seamless continuous scrolling */}
      <div className="md:hidden overflow-hidden">
        <div 
          className="flex whitespace-nowrap"
          style={{
            width: 'fit-content',
            animation: 'marquee-mobile 20s linear infinite',
            direction: 'ltr',
            textAlign: 'left',
          }}
        >
          <span className="text-white text-sm font-bold" style={{ direction: 'ltr' }}>{mobileItems}</span>
          <span className="text-white text-sm font-bold" style={{ direction: 'ltr' }}>{mobileItems}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
