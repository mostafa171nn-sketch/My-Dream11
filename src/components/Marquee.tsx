'use client';

const Marquee = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-800 dark:to-gray-900 py-2 md:py-4">



      <div 
        className="marquee-content flex whitespace-nowrap"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
       
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🏆 Best Training Academy 🏆
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          💪 Join Our Programs Today 💪
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🌟 Achieve Your Goals 🌟
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🎯 Expert Coaching 🎯
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🚀 Start Your Journey 🚀
        </span>
        {/* Duplicate for seamless loop */}
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          ✨ Transform Your Dreams Into Reality ✨
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🏆 Best Training Academy 🏆
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          💪 Join Our Programs Today 💪
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🌟 Achieve Your Goals 🌟
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🎯 Expert Coaching 🎯
        </span>
        <span className="mx-2 md:mx-4 text-white text-base md:text-xl font-bold">
          🚀 Start Your Journey 🚀
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 5s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
