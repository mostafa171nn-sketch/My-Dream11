'use client';

const Marquee = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-gray-800 dark:to-gray-900 py-2 md:py-4">
      {/* Desktop - Show all items */}
      <div 
        className="marquee-content hidden md:flex whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite',
        }}
      >
        <span className="mx-4 text-white text-xl font-bold">
          🏆 Best Training Academy 🏆
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          💪 Join Our Programs Today 💪
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🌟 Achieve Your Goals 🌟
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🎯 Expert Coaching 🎯
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🚀 Start Your Journey 🚀
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          ✨ Transform Your Dreams Into Reality ✨
        </span>
        {/* Duplicate for seamless loop */}
        <span className="mx-4 text-white text-xl font-bold">
          🏆 Best Training Academy 🏆
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          💪 Join Our Programs Today 💪
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🌟 Achieve Your Goals 🌟
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🎯 Expert Coaching 🎯
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          🚀 Start Your Journey 🚀
        </span>
        <span className="mx-4 text-white text-xl font-bold">
          ✨ Transform Your Dreams Into Reality ✨
        </span>
      </div>

      {/* Mobile - Show 10 items */}
      <div 
        className="marquee-content md:hidden flex whitespace-nowrap"
        style={{
          animation: 'marquee 6s linear infinite',
        }}
      >
        <span className="mx-2 text-white text-sm font-bold">
          🏆 Best Academy
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          💪 Join Today
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🌟 Achieve Goals
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🎯 Expert Coaching
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🚀 Start Journey
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          ✨ Transform Dreams
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          📚 Learn More
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🎓 Get Certified
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          ⭐ Success Stories
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🏅 Top Rated
        </span>
        {/* Duplicate for seamless loop */}
        <span className="mx-2 text-white text-sm font-bold">
          🏆 Best Academy
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          💪 Join Today
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🌟 Achieve Goals
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🎯 Expert Coaching
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🚀 Start Journey
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          ✨ Transform Dreams
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          📚 Learn More
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🎓 Get Certified
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          ⭐ Success Stories
        </span>
        <span className="mx-2 text-white text-sm font-bold">
          🏅 Top Rated
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
      `}</style>
    </div>
  );
};

export default Marquee;
