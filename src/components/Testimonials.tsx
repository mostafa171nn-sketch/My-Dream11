// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const testimonials = [
//   {
//     id: 1,
//     name: "Ahmed Hassan",
//     role: "Student",
//     image: "/images/champion1.jpg",
//     content: "My Dream Academy transformed my life. The coaches are incredibly supportive and the programs are tailored to individual needs. I've achieved goals I never thought possible!",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Sarah Mohamed",
//     role: "Parent",
//     image: "/images/champion5.jpg",
//     content: "Watching my daughter grow in confidence through the programs here has been amazing. The academy truly cares about each student's development.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Omar Khaled",
//     role: "Graduate",
//     image: "/images/champion6.jpg",
//     content: "The quality of training and mentorship I received here was exceptional. I'm now pursuing my dreams with full confidence thanks to My Dream Academy.",
//     rating: 5
//   },
//   {
//     id: 4,
//     name: "Fatma Ali",
//     role: "Student",
//     image: "/images/champion9.jpg",
//     content: "The environment is so supportive and encouraging. Every instructor genuinely wants to see you succeed. This is more than just an academy - it's a family.",
//     rating: 5
//   },
//   {
//     id: 5,
//     name: "Youssef Ibrahim",
//     role: "Parent",
//     image: "/images/champion12.jpg",
//     content: "We've seen remarkable improvement in our son's skills and confidence. The academy provides excellent structure while keeping the learning enjoyable.",
//     rating: 5
//   },
//   {
//     id: 6,
//     name: "Layla Ahmed",
//     role: "Student",
//     image: "/images/champion13.jpg",
//     content: "The personalized attention and expert guidance helped me exceed my own expectations. I'm grateful for every moment spent at My Dream Academy.",
//     rating: 5
//   }
// ];

// const Testimonials = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [visibleCards, setVisibleCards] = useState<number[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const section = document.getElementById('testimonials-section');
//       if (section) {
//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight * 0.8) {
//           setIsVisible(true);
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       testimonials.forEach((_, index) => {
//         setTimeout(() => {
//           setVisibleCards(prev => [...new Set([...prev, index])]);
//         }, index * 150);
//       });
//     }
//   }, [isVisible]);

//   return (
//     <section id="testimonials-section" className="py-20 bg-gradient-to-b from-white via-blue-50 to-cyan-50 dark:from-[#4b5563] dark:via-[#4b5563] dark:to-[#4b5563]">

//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             <span className="gradient-text">What People Say</span>
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">

//             Hear from our community of students and parents about their transformative experiences
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-4 rounded-full"></div>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={testimonial.id}
//               className={`transform transition-all duration-700 ${
//                 visibleCards.includes(index)
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-12'
//               }`}
//               style={{
//                 transitionDelay: `${index * 100}ms`
//               }}
//             >
//               <div className="bg-white dark:bg-[#374151] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-600 h-full flex flex-col">

//                 {/* Quote Icon */}
//                 <div className="text-blue-200 mb-4">
//                   <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                   </svg>
//                 </div>

//                 {/* Content */}
//                 <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow italic">

//                   "{testimonial.content}"
//                 </p>

//                 {/* Rating */}
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>

//                 {/* Author */}
//                 <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
//                   <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-100">
//                     <Image
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div>
//                   <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h4>
//                   <p className="text-sm text-blue-600 dark:text-cyan-400 font-medium">{testimonial.role}</p>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View More Button */}
//         <div className="text-center mt-12">
//           <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
//             View All Testimonials
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .gradient-text {
//           background: linear-gradient(45deg, #00b7b5, #00b7b5, #268f9f);
//           background-size: 200% 200%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: gradientShift 3s ease-in-out infinite;
//         }

//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Testimonials;
