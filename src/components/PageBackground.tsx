'use client';

const PageBackground = () => {
  return (
    <>
      {/* Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 -z-10"></div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-200 rounded-full opacity-40 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-40 animate-pulse delay-150"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-pulse delay-300"></div>
      </div>
    </>
  );
};

export default PageBackground;
