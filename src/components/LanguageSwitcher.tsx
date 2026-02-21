'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'en'
            ? 'bg-white/30 text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20'
        }`}
      >
        ENGLISH
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'ar'
            ? 'bg-white/30 text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20'
        }`}
        style={{ fontFamily: 'Arabic, sans-serif' }}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSwitcher;
