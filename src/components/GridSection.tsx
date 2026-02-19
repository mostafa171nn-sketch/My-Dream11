'use client';

import GridCard from './GridCard';

const gridItems = [
  {
    image: '/images/grid1.jpg',
    title: 'Joumana hamdy',
    subtitle: '2007',
    link: '/about'
  },
  {
    image: '/images/3.jpg',
    title: 'khadija sameh / hala elarby',
    subtitle: '2010/1010',
    link: '/about'
  },
  {
    image:   '/images/2.jpg',

    title: 'yahya mohamed',
    subtitle: '2007',
    link: '/about'
  },
  
  {
    image: '/images/grid3.jpg',
    title: 'Yousif Shref',
    subtitle: '2011',
    link: '/about'
  },
  {
    image: '/images/grid4.jpg',
    title: 'Hamza Aymen',
    subtitle: '2012',
    link: '/about'
  },
  {
    image: '/images/sheta.jpg',
    title: 'Mostafa Sheta',
    subtitle: '2008',
    link: '/about'
  },
  {
    image: '/images/grid6.jpg',
    title: 'Mostafa Omar',
    subtitle: '2004',
    link: '/about'
  },
  {
    image: '/images/grid7.jpg',
    title: 'Khadija Sameh',
    subtitle: '2009',
    link: '/about'
  },
 
  {
    image: '/images/grid5.jpg',
    title: 'Omar ',
    subtitle: '2011',
    link: '/about'
  },
  {
    image: '/images/yara1.jpeg',
    title: 'Yara Shref',
    subtitle: '2010',
    link: '/about'
  }
];





const GridSection = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-[#1f2937] overflow-hidden">


      {/* Subtle background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">Programs</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">

            Discover our comprehensive training programs designed to help you achieve your dreams
          </p>
        </div>


        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {gridItems.map((item, index) => (
            <GridCard
              key={index}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              link={item.link}
              index={index}
              imagePosition={index === 1 ? "object-bottom" : "object-cover"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridSection;
