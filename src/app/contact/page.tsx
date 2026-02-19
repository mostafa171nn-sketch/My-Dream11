'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create floating hearts
    const hearts: FloatingHeart[] = [];
    for (let i = 0; i < 20; i++) {
      hearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5
      });
    }
    setFloatingHearts(hearts);
    
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        category: formData.category || '',
        phone: formData.phone || '',
        message: formData.message,
        date: new Date().toISOString(),
        status: 'pending'
      });
      
      console.log('Document written with ID: ', docRef.id);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', category: '', phone: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
        setFloatingHearts([]);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting form: ', error);
      setIsSubmitting(false);
      setFloatingHearts([]);
      
      // Show more detailed error message
      let errorMessage = 'Failed to submit. Please try again.';
      if (error?.code === 'permission-denied' || error?.message?.includes('permission')) {
        errorMessage = 'Permission denied! Please contact the administrator to enable Firebase write access.';
      } else if (error?.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Hearts Animation */}
      {floatingHearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {floatingHearts.map((heart, index) => (
            <div
              key={heart.id}
              className="absolute text-pink-500 text-4xl animate-float-up"
              style={{
                left: `${heart.x}%`,
                bottom: '20%',
                animationDelay: `${heart.delay}s`,
                opacity: 0
              }}
            >
              ❤️
            </div>
          ))}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-left" style={{ left: '5%', bottom: '1%', animationDelay: '0s' }}>❤️</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '5%', bottom: '19%', animationDelay: '0.1s' }}>❤️</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '15%', bottom: '10%', animationDelay: '0.2s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '54%', bottom: '15%', animationDelay: '0.3s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '75%', bottom: '15%', animationDelay: '0.5s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '35%', bottom: '2%', animationDelay: '0.1s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '55%', bottom: '5%', animationDelay: '0.4s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-left" style={{ left: '25%', bottom: '9%', animationDelay: '0.15s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '40%', bottom: '7%', animationDelay: '0.25s' }}>💗</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '25%', bottom: '15%', animationDelay: '0.35s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '60%', bottom: '20%', animationDelay: '0.4s' }}>💖</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-left" style={{ left: '75%', bottom: '10%', animationDelay: '0.45s' }}>❤️</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up-right" style={{ right: '35%', bottom: '0%', animationDelay: '0.5s' }}>💗</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '75%', bottom: '0%', animationDelay: '0.2s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '95%', bottom: '0%', animationDelay: '0.2s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '25%', bottom: '0%', animationDelay: '0.7s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '65%', bottom: '0%', animationDelay: '0.9s' }}>💕</div>
          )}
          {floatingHearts.length > 0 && (
            <div className="absolute text-pink-500 text-4xl animate-float-up" style={{ left: '45%', bottom: '0%', animationDelay: '0.8s' }}>💕</div>
          )}
        </div>
      )}
      
      <Navbar />
      
      <main className="py-16 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-[#1f2937] dark:via-[#1f2937] dark:to-[#1f2937]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="rotating-gradient-border ">
              <div className="bg-white dark:bg-[#111827] rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-cyan-400">Send us a Message</h2>
              
              {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="  space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="baby">Baby</option>
                    <option value="adult">Adult</option>
                    <option value="women">Women</option>
                    <option value="professional">Professional</option>
                    <option value="special">Special</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!/[\d\b]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="برجاء كتابه المعاد المناسب"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#111827] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-cyan-400">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">Phone</div>
                      <div className="text-gray-600 dark:text-gray-300">01115636975</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">Email</div>
                      <div className="text-gray-600 dark:text-gray-300">mostafa171nn@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">Branches</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        مدرسه الحياه: القاهره الجديده<br />
                        عالم الرياضة: الوفاء و الامل
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#111827] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-cyan-400">Follow Us</h2>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/mydreamacadmy?igsh=Y2FyYmlycWU0OHcx" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/share/15sk8ZA1UX/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://wa.me/01115636975" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Add custom styles for floating hearts animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          20% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(-300px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-400px) scale(0.5);
          }
        }
        @keyframes float-up-left {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          20% {
            opacity: 1;
            transform: translate(-20px, -20px) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(-50px, -300px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-80px, -400px) scale(0.5);
          }
        }
        @keyframes float-up-right {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          20% {
            opacity: 1;
            transform: translate(20px, -20px) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(50px, -300px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(80px, -400px) scale(0.5);
          }
        }
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
        .animate-float-up-left {
          animation: float-up-left 2s ease-out forwards;
        }
        .animate-float-up-right {
          animation: float-up-right 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
