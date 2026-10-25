import React from 'react';

export const WatermelonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#F4F8F5]">
      {/* Soft ambient natural tints matching reference image */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-[550px] h-[550px] bg-teal-500/[0.025] rounded-full blur-[150px] pointer-events-none" />
      {/* Bottom organic landscape hill wave matching reference image */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full h-28 sm:h-36 text-[#E2ECE5]/70 pointer-events-none" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,55 C320,20 520,85 820,50 C1120,15 1300,65 1440,45 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
};
