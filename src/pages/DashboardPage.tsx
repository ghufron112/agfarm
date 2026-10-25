import React from 'react';
import { 
  Droplets, 
  ChevronRight, 
  Brain, 
  Clock, 
  CloudSun, 
  CloudRain, 
  Sun,
  Leaf,
  Power
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const DashboardPage: React.FC = () => {
  const { 
    sensorData, 
    fuzzyDecision, 
    setIsFuzzyModalOpen, 
    isPumpActive, 
    pumpRemainingSeconds, 
    startWatering, 
    stopWatering, 
    irrigationMode,
    setCurrentPage
  } = useFarm();

  const isDelayed = fuzzyDecision.decision.toLowerCase().includes('tunda') || fuzzyDecision.decision.toLowerCase().includes('tidak');

  return (
    <div className="select-none relative pb-10">
      {/* 
        Responsive Layout Engine:
        - Desktop: 2-Column Grid (8 cols left, 4 cols right) matching reference image
        - Mobile: Single-Column with strict order:
          1. Hero -> 2. Kelembapan -> 3. Cuaca -> 4. Keputusan -> 5. Irigasi -> 6. Riwayat
      */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        
        {/* ================= LEFT MAIN WRAPPER (Desktop: 8 cols | Mobile: contents) ================= */}
        <div className="contents lg:block lg:col-span-8 lg:space-y-5">
          
          {/* 1. HERO AG FARM BANNER (Mobile: Order 1) */}
          <div className="order-1 relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-r from-[#EAF5EF] via-[#E2F0E8] to-[#D5EADF] border border-emerald-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[175px] sm:min-h-[205px] flex items-center">
            {/* Background 3D Watermelon Landscape on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-3/5 overflow-hidden pointer-events-none">
              <img 
                src="/assets/hero_watermelon_3d.png" 
                alt="Kebun Semangka AG Farm"
                className="w-full h-full object-cover object-left-center mix-blend-multiply opacity-95 transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/watermelon_hero.jpg';
                }}
              />
              {/* Soft gradient fade overlay to blend left text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EAF5EF] via-[#EAF5EF]/80 to-transparent" />
            </div>

            {/* Left Text Content */}
            <div className="relative z-10 p-5 sm:p-7 max-w-sm sm:max-w-md space-y-2 text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B3323] tracking-tight">
                  AG Farm
                </h1>
                <span className="text-xl sm:text-2xl animate-bounce">🍃</span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-[#1B5E3F] tracking-wide">
                Smart Irrigation for Better Farming
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal pt-0.5 line-clamp-2 sm:line-clamp-none">
                Pantau kondisi tanah dan cuaca, biarkan sistem menentukan kebutuhan penyiraman tanaman semangka secara cerdas.
              </p>
            </div>
          </div>

          {/* SENSOR CARDS CONTAINER */}
          <div className="contents lg:grid lg:grid-cols-2 lg:gap-4">
            
            {/* 2. SENSOR KELEMBAPAN TANAH (Mobile: Order 2) */}
            <div 
              onClick={() => setCurrentPage('irigasi')}
              className="order-2 rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 sm:p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Leaf className="w-5 h-5 fill-emerald-600/20" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    Kelembapan Tanah
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="flex items-baseline gap-2.5 mb-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {sensorData.soil_moisture}%
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Ideal
                </span>
              </div>

              {/* Green Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-[#137A4D] rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, sensorData.soil_moisture)}%` }}
                />
              </div>
            </div>

            {/* SENSOR CUACA MINI (Desktop only, side-by-side with moisture) */}
            <div 
              onClick={() => setCurrentPage('cuaca')}
              className="hidden lg:flex rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 sm:p-5 flex-col justify-between hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    Cuaca
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {sensorData.temperature}°C
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Cerah Berawan
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                  Hujan {sensorData.weather_probability}%
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-medium">
                Sensor Mikroklimat Stasiun Kebun
              </div>
            </div>
          </div>

          {/* 5. MAIN IRRIGATON VISUAL CARD (Mobile: Order 5 | Desktop: Bottom Left) */}
          <div className="order-5 rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 sm:p-7 space-y-4">
            
            {/* Header with Title and Status Badges */}
            <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Irigasi Tetes
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Pump Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isPumpActive 
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 animate-pulse'
                    : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isPumpActive ? 'bg-cyan-500 animate-ping' : 'bg-rose-500'}`} />
                  <span>{isPumpActive ? `Pompa ON (${pumpRemainingSeconds}s)` : 'Pompa OFF'}</span>
                </span>

                {/* Mode Badge */}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                  Mode: {irrigationMode}
                </span>
              </div>
            </div>

            {/* 3D Agricultural Setup Illustration */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#F7FAF7] to-white border border-slate-100/80 p-2 sm:p-4 overflow-hidden flex flex-col items-center justify-center min-h-[160px] sm:min-h-[210px]">
              
              {/* Illustration Image matching reference */}
              <div className="relative w-full max-w-xl flex items-center justify-center">
                <img 
                  src="/assets/drip_pipeline_3d.png" 
                  alt="Sistem Irigasi Tetes 3D"
                  className="w-full h-auto max-h-[150px] sm:max-h-[190px] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.01]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/drip_isometric.jpg';
                  }}
                />

                {/* Animated Water Droplets Overlay when pump is active */}
                {isPumpActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Water flow pulse line */}
                    <div className="absolute top-[48%] left-[20%] right-[10%] h-1 bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-400 opacity-75 blur-[1px] animate-pulse" />
                    
                    {/* Gentle falling water droplets onto watermelons */}
                    <div className="absolute top-[42%] right-[24%] animate-bounce text-cyan-500 text-xs">💧</div>
                    <div className="absolute top-[38%] right-[32%] animate-bounce text-cyan-500 text-xs [animation-delay:200ms]">💧</div>
                    <div className="absolute top-[44%] right-[40%] animate-bounce text-cyan-500 text-xs [animation-delay:400ms]">💧</div>
                  </div>
                )}
              </div>
            </div>

            {/* Flow Indicator Strip */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-4 text-[11px] sm:text-xs font-bold text-slate-600 pt-1 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">🛢️</span>
                <span>Tangki Air</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">⚡</span>
                <span>Pompa</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">💧</span>
                <span>Drip Line</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">🍉</span>
                <span>Tanaman Semangka</span>
              </div>
            </div>

            {/* Action Button: Mulai / Hentikan Penyiraman */}
            <div className="pt-2 flex justify-center">
              {isPumpActive ? (
                <button
                  onClick={stopWatering}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse"
                >
                  <Power className="w-4 h-4" />
                  <span>⏹️ Hentikan Penyiraman ({pumpRemainingSeconds}s)</span>
                </button>
              ) : (
                <button
                  onClick={() => startWatering(180)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#135A3E] hover:bg-[#0E4931] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#135A3E]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>💧 Mulai Penyiraman</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT MAIN WRAPPER (Desktop: 4 cols | Mobile: contents) ================= */}
        <div className="contents lg:block lg:col-span-4 lg:space-y-5">
          
          {/* 3. WEATHER CARD (Mobile: Order 3 | Desktop: Top Right) */}
          <div className="order-3 rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-4 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Cuaca Hari Ini</h3>
                  <span className="text-[11px] text-slate-400 font-medium">Sel, 27 Okt 2025</span>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentPage('cuaca')}
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Lihat Cuaca"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Main Temperature Display & Subtle Cloud Art */}
            <div className="relative pt-1">
              <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                {sensorData.temperature}°C
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Cerah Berawan
              </p>

              {/* Soft Cloud & Sun Art (upper right) */}
              <div className="absolute right-0 top-0 pointer-events-none w-24 h-20 opacity-80">
                <img 
                  src="/assets/weather_cloud.png" 
                  alt="Awan & Matahari"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Rain Probability */}
            <div className="pt-2 border-t border-slate-100/80">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                <span>🌧️</span>
                <span>Probabilitas Hujan</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900">
                {sensorData.weather_probability}%
              </div>
            </div>

            {/* 3-Day Forecast Bottom Strip */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100/80 text-center">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold block">Hari Ini</span>
                <span className="text-base block">⛅</span>
                <span className="text-[11px] font-bold text-slate-700 font-mono block">31° / 24°</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold block">Besok</span>
                <span className="text-base block">🌧️</span>
                <span className="text-[11px] font-bold text-slate-700 font-mono block">28° / 23°</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold block">Lusa</span>
                <span className="text-base block">🌧️</span>
                <span className="text-[11px] font-bold text-slate-700 font-mono block">27° / 22°</span>
              </div>
            </div>
          </div>

          {/* 4. SYSTEM DECISION CARD (Mobile: Order 4 | Desktop: Bottom Right) */}
          <div className="order-4 rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-4">
            
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Brain className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Keputusan Sistem
              </h3>
            </div>

            {/* Main Decision Status Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F0F7F2] border border-emerald-100/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                <Clock className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-black text-emerald-950 truncate">
                  {fuzzyDecision.decision || 'Penyiraman Ditunda'}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-2">
                  Tanah cukup lembap + probabilitas hujan tinggi
                </p>
              </div>
            </div>

            {/* 4 Small Metrics (4 columns) */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1 text-center">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#F7FAF7] border border-slate-100 space-y-0.5">
                <span className="text-xs">🍃</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 font-mono block">
                  {sensorData.soil_moisture}%
                </span>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Kelembapan
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-[#F7FAF7] border border-slate-100 space-y-0.5">
                <span className="text-xs">🌧️</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 font-mono block">
                  {sensorData.weather_probability}%
                </span>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Hujan
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-[#F7FAF7] border border-slate-100 space-y-0.5">
                <span className="text-xs">💧</span>
                <span className="text-[11px] sm:text-xs font-bold text-sky-700 font-mono block">
                  {fuzzyDecision.water_need || 35}%
                </span>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Water Need
                </span>
              </div>

              <div className="p-1.5 sm:p-2 rounded-xl bg-[#F7FAF7] border border-slate-100 space-y-0.5">
                <span className="text-xs">⏻</span>
                <span className={`text-[11px] sm:text-xs font-bold font-mono block ${isPumpActive ? 'text-cyan-600' : 'text-slate-800'}`}>
                  {isPumpActive ? 'ON' : 'OFF'}
                </span>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Pompa
                </span>
              </div>
            </div>

            {/* Button: Lihat Detail */}
            <button
              onClick={() => setIsFuzzyModalOpen(true)}
              className="w-full py-2.5 rounded-full border border-emerald-600/30 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all text-center block cursor-pointer"
            >
              Lihat Detail →
            </button>
          </div>

          {/* 6. RIWAYAT CARD (Mobile only: Order 6 | Desktop: hidden) */}
          <div className="order-6 lg:hidden rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Riwayat Penyiraman
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                Optimal
              </span>
            </div>

            {/* Recent activity summary */}
            <div className="p-3.5 rounded-2xl bg-[#F7FAF7] border border-slate-100 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Penyiraman Otomatis Terakhir</span>
                <span className="text-emerald-700 font-mono text-[11px]">Selesai</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Hari ini, 06:15 WIB • Durasi 3 Menit • Volume ~12 Liter
              </p>
            </div>

            {/* Link to full History page */}
            <button
              onClick={() => setCurrentPage('riwayat')}
              className="w-full py-2.5 rounded-full bg-slate-50 hover:bg-emerald-50 text-emerald-800 border border-slate-200/60 text-xs font-bold transition-colors text-center block cursor-pointer"
            >
              Lihat Riwayat Lengkap →
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Calligraphy Watermark at Bottom Right matching reference */}
      <div className="order-7 flex justify-end pt-3 pr-2 pointer-events-none">
        <p className="font-['Caveat',cursive] text-emerald-800/60 text-lg sm:text-xl font-medium tracking-wide">
          Smart Farming for a Greener Future 🍃
        </p>
      </div>
    </div>
  );
};
