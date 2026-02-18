'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GridCardProps {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  index: number;
  imagePosition?: string;
}

const GridCard = ({ image, title, subtitle, link, index, imagePosition = "object-cover" }: GridCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
        background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
        backgroundSize: '300% 300%',
        animation: 'gradient-xy 4s ease infinite'
      }} />
      
      {/* Card content */}
      <motion.div 
        className="relative aspect-[4/5] sm:aspect-[3/4] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image - Full clarity */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            quality={100}
            priority={index < 6}
            className={`${imagePosition} transition-transform duration-500 group-hover:scale-105`}
          />
          {/* Minimal overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Subtle hover glow */}
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Year Badge - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] sm:text-xs text-white font-semibold border border-white/20">
            {subtitle}
          </span>
        </div>

        {/* Name - Bottom Center */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center z-10">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-lg tracking-wide">
            {title}
          </h3>
        </div>

        {/* Hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
};

export default GridCard;
