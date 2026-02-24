'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ text, fullScreen = true }: LoadingProps) {
  const { t } = useLanguage();
  
  const displayText = text || t('loadingText');
  
  return (
    <div 
      className={fullScreen ? "loading-overlay" : "flex flex-col items-center justify-center"}
      style={fullScreen ? { 
        backgroundColor: '#000000',
        minHeight: '100vh',
        width: '100%'
      } : undefined}
    >
      <div className="loader">
        <style jsx>{`
          .loader {
            position: relative;
            width: 108px;
            display: flex;
            justify-content: space-between;
          }
          .loader::after,
          .loader::before {
            content: "";
            display: inline-block;
            width: 48px;
            height: 48px;
            background-color: #fff;
            background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
            background-repeat: no-repeat;
            border-radius: 50%;
            animation: eyeMove 10s infinite, blink 10s infinite;
          }
          @keyframes eyeMove {
            0%,
            10% {
              background-position: 0px 0px;
            }
            13%,
            40% {
              background-position: -15px 0px;
            }
            43%,
            70% {
              background-position: 15px 0px;
            }
            73%,
            90% {
              background-position: 0px 15px;
            }
            93%,
            100% {
              background-position: 0px 0px;
            }
          }
          @keyframes blink {
            0%,
            10%,
            12%,
            20%,
            22%,
            40%,
            42%,
            60%,
            62%,
            70%,
            72%,
            90%,
            92%,
            98%,
            100% {
              height: 48px;
            }
            11%,
            21%,
            41%,
            61%,
            71%,
            91%,
            99% {
              height: 18px;
            }
          }
        `}</style>
      </div>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <span style={{ 
          
          color:'while',
          
          fontSize: '1.0rem',
          fontWeight: 'bolder'
        }}>
          My Dream Academy
        </span>
        <span style={{ 
          animation: 'loadingBlink 1s infinite',
          marginLeft: '4px'
        }}>.</span>
      </div>
    </div>
  );
}
