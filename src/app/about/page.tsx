import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="py-16 px-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-[#1f2937] dark:via-[#1f2937] dark:to-[#1f2937]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">About My Dream Academy</h1>
          
          {/* Owner Section - C/Mohamed Helmy */}
          <div className="mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-2xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Owner Photo */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                <div className="absolute inset-0 bg-white rounded-full p-1">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/images/owner.jpg"
                      alt="C/Mohamed Helmy - Academy Founder"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 192px, 224px"
                    />
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-75 blur-sm -z-10"></div>
              </div>
              
              {/* Owner Info */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  C/Mohamed Helmy
                </h3>
                <div className="w-24 h-1 bg-yellow-400 mx-auto md:mx-0 mb-4 rounded-full"></div>
                <p className="text-lg md:text-xl mb-4 text-blue-100">
                  Founder & Director of My Dream Academy
                </p>
                <p className="text-sm md:text-base mb-6 text-blue-50 leading-relaxed">
                  With years of experience in professional swimming and coaching, 
                  C/Mohamed Helmy established My Dream Academy to nurture the next generation 
                  of swimming champions. His vision and dedication have transformed countless 
                  young swimmers into national and international competitors.
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a 
                    href="tel:01111695090" 
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-6 py-3 rounded-full font-semibold"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    01115636975
                  </a>
                  <span className="text-sm text-blue-200">
                    📞 Contact for inquiries & registration
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Swimming Academy Schedule - Gadwal */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-center">مدارس تعليم السباحة</h2>
              <p className="text-center mt-2 text-cyan-100 font-bold">فرع الوفاء و الامل</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Group 1 & 2 - Side by Side */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                {/* Group 1 */}
                <div>
                  <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">المجموعة الأولى</h3>
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">السبت والاثنين والأربعاء</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">من 4 عصراً إلى 8 مساءاً</p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">(بواقع ساعة تدريبية) 3 أيام أسبوعياً</p>
                  </div>
                </div>
                
                {/* Group 2 */}
                <div>
                  <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">المجموعة الثانية</h3>
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">الأحد والثلاثاء والخميس</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">من 4 عصراً إلى 8 مساءاً</p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">(بواقع ساعة تدريبية) 3 أيام أسبوعياً</p>
                  </div>
                </div>
              </div>
              
              {/* Group 3 - Friday & Saturday */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3">المجموعة الثالثة (الجمعة والسبت)</h3>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-3">(بواقع ساعة تدريبية) 2 يوم أسبوعياً</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">يوم الجمعة:</h4>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>من 9 صباحاً إلى 10 صباحاً</li>
                      <li>من 10 صباحاً إلى 11 صباحاً</li>
                      <li>من 2 ظهراً إلى 3 عصراً</li>
                      <li>من 3 عصراً إلى 4 عصراً</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">يوم السبت:</h4>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>من 9 صباحاً إلى 10 صباحاً</li>
                      <li>من 10 صباحاً إلى 11 صباحاً</li>
                      <li>من 11 صباحاً إلى 12 ظهراً</li>
                      <li>من 12 ظهراً إلى 1 ظهراً</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Preparatory Teams */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">تدريب فرق التجهيزي</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">السبت والاثنين والأربعاء</p>
                    <p className="text-gray-600 dark:text-gray-400">من 8 مساءاً إلى 9 مساءاً</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">(بواقع ساعة تدريبية) 3 أيام أسبوعياً</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">الأحد والثلاثاء والخميس</p>
                    <p className="text-gray-600 dark:text-gray-400">من 8 مساءاً إلى 9 مساءاً</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">(بواقع ساعة تدريبية) 3 أيام أسبوعياً</p>
                  </div>
                </div>
              </div>
              
              {/* Ladies Training */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">مواعيد تدريب السيدات</h3>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-bold text-pink-700 dark:text-pink-400 min-w-[100px]">يوم الجمعة:</span>
                    <span className="text-gray-700 dark:text-gray-300">من 7 صباحاً إلى 9 صباحاً ومن 11 صباحاً إلى 2 ظهراً</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-bold text-pink-700 dark:text-pink-400 min-w-[100px]">يوم السبت:</span>
                    <span className="text-gray-700 dark:text-gray-300">من 7 صباحاً إلى 9 صباحاً</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-bold text-pink-700 dark:text-pink-400 min-w-[100px]">الأحد - الخميس:</span>
                    <span className="text-gray-700 dark:text-gray-300">من 7 صباحاً إلى 11 صباحاً</span>
                  </div>
                </div>
              </div>
              
              {/* Academy Manager */}
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">مدير الأكاديمية</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-cyan-400">ك / حلمي</p>
              </div>
              
              {/* Join Us Now Button */}
              <div className="mt-6 text-center">
                <a 
                  href="/contact" 
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  انضم الينا الان
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
