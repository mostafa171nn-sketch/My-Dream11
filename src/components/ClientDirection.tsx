'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ClientDirection({ children }: { children: React.ReactNode }) {
  const { isRTL } = useLanguage();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
