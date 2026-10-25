import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Droplets, Sparkles, X, Brain } from 'lucide-react';

export const MascotMelo: React.FC = () => {
  const { 
    sensorData, 
    isPumpActive, 
    pumpRemainingSeconds, 
    setIsFuzzyModalOpen 
  } = useFarm();

  const [showTooltip, setShowTooltip] = useState(false);

  // Status computation for watermelon mascot reaction
  const isDry = sensorData.soil_moisture < 45;
  const isRainy = sensorData.weather_probability >= 65;

  let moodEmoji = '🍉';
  let statusText = 'Kondisi tanaman semangka prima!';
  let statusBadge = 'Segar & Optimal';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';

  if (isPumpActive) {
    moodEmoji = '🌱';
    statusText = `Air sedang mengalir ke akar semangka (${pumpRemainingSeconds}s)`;
    statusBadge = 'Menyiram Aktif';
    badgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200';
  } else if (isDry) {
    moodEmoji = '🍂';
    statusText = 'Tanah agak kering (di bawah 45%), siap disiram.';
    statusBadge = 'Perlu Air';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
  } else if (isRainy) {
    moodEmoji = '🌦️';
    statusText = 'Potensi hujan tinggi. Penyiraman ditunda otomatis!';
    statusBadge = 'Tunda Siram';
    badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble / Status Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto mb-3 max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-2 duration-200 text-slate-800">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🍉</span>
              <span className="text-xs font-extrabold text-emerald-900">Melo • Status Semangka</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-snug mb-2 font-medium">
            {statusText}
          </p>

          <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100">
            <span className={`px-2 py-0.5 rounded-full font-bold border ${badgeColor}`}>
              {statusBadge}
            </span>
            <button
              onClick={() => setIsFuzzyModalOpen(true)}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <Brain className="w-3 h-3" />
              <span>Detail Fuzzy</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Animated Mascot Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white shadow-lg shadow-emerald-700/25 border-2 border-white/80 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        title="Klik untuk melihat status semangka"
      >
        {/* Animated Water Droplets when pump is active */}
        {isPumpActive && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] items-center justify-center font-bold text-white">
              💧
            </span>
          </span>
        )}

        {/* Subtle glowing ring */}
        <span className="absolute inset-0 rounded-2xl bg-emerald-400/20 group-hover:bg-emerald-400/30 blur-xs transition-colors pointer-events-none" />

        {/* Mascot Face Illustration */}
        <div className="relative text-2xl animate-[mascotBounce_3s_ease-in-out_infinite]">
          {isPumpActive ? '🍉' : moodEmoji}
        </div>
      </button>
    </div>
  );
};
