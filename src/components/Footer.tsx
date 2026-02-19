'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-900 dark:to-gray-800 text-white py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex flex-col items-center text-decoration-none">
              <img 
                src="/logoo.jpeg" 
                alt="My Dream Academy Logo" 
                className="w-32 h-32 rounded-full object-cover mb-3"
              />
              <span className="text-lg font-semibold">My Dream Academy</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-sm font-semibold uppercase mb-4 text-center">Quick links</h5>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-white/90 hover:text-gray-300 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-white/90 hover:text-gray-300 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Details</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-white/90 hover:text-gray-300 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact-Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-white text-sm font-semibold uppercase mb-4 text-center">follow us</h5>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com/mydreamacadmy?igsh=Y2FyYmlycWU0OHcx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/90 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/share/1fuxRx1sgj/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/90 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>FaceBook</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/01115636975" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/90 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@my.dream.swimming?_r=1&_t=ZS-940hMKy6YAG" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/90 hover:text-black transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-3.64 2.89 2.89 0 0 1 2.18.92V8.78a6.77 6.77 0 0 0-4.19 2.11 6.77 6.77 0 0 0-2.19 4.94 6.77 6.77 0 0 0 6.38 6.71 6.77 6.77 0 0 0 6.38-6.71v-7.5a8.08 8.08 0 0 0 4.77 1.52v-3.4a4.53 4.53 0 0 1-3.22-1.26z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h5 className="text-white text-sm font-semibold uppercase mb-4 text-center">Our Branches</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/90 hover:text-gray-300 transition-colors duration-300">
                  مدرسه الحياه: القاهره الجديده
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-gray-300 transition-colors duration-300">
                  عالم الرياضة: الوفاء و الامل
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="text-center">
            <span className="text-md ">
             <Link href="/" className="text-gray-600"> © 2026 Created By : Mostafa Omar</Link>
            </span>
            <p className="text-sm flex items-center justify-center gap-2 mt-2 text-gray-600">
              <span>📞</span> 01111695090
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
