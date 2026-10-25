import React from 'react';

export const WatermelonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#F4F8F5]">
      {/* Soft ambient natural tints matching reference image */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-28 w-[550px] h-[550px] bg-teal-500/[0.025] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-400/[0.025] rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};
