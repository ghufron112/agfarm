import React from 'react';
import { useFarm } from '../context/FarmContext';

export const WatermelonBackground: React.FC = () => {
  const { theme } = useFarm();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Wallpaper Texture */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isDark ? 'opacity-10 mix-blend-screen invert' : 'opacity-35 mix-blend-multiply'
        }`}
        style={{ backgroundImage: `url('/assets/watermelon_bg_texture.jpg')` }}
      />

      {/* 2. Ambient Mesh Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-emerald-500/12 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/4 -right-28 w-[550px] h-[550px] bg-rose-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-teal-500/9 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[130px] pointer-events-none" />

      {/* 3. Subtle Vector Watermelon Watermarks (Very Faint & Classy) */}
      <svg 
        className={`absolute inset-0 w-full h-full ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Watermelon Slice Pattern */}
          <pattern id="watermelon-grid" width="220" height="220" patternUnits="userSpaceOnUse">
            {/* Minimalist Watermelon Slice Silhouette */}
            <path
              d="M 40 140 A 60 60 0 0 0 160 140 Z"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <path
              d="M 52 140 A 48 48 0 0 0 148 140 Z"
              fill="none"
              stroke="#E11D48"
              strokeWidth="1.5"
            />
            {/* Seeds */}
            <path d="M 85 152 Q 87 146 89 152 Q 87 155 85 152 Z" fill="#0F172A" />
            <path d="M 100 158 Q 102 152 104 158 Q 102 161 100 158 Z" fill="#0F172A" />
            <path d="M 115 152 Q 117 146 119 152 Q 117 155 115 152 Z" fill="#0F172A" />

            {/* Subtle Vine Tendril Wave */}
            <path
              d="M 180 30 C 195 50 170 80 190 100"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="188" cy="98" r="2" fill="#10B981" />

            {/* Drip Droplet */}
            <path
              d="M 30 40 C 30 35 34 26 34 26 C 34 26 38 35 38 40 C 38 44 34.5 46 34 46 C 33.5 46 30 44 30 40 Z"
              fill="#0284C7"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#watermelon-grid)" />
      </svg>
    </div>
  );
};
