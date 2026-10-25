import React, { useState } from 'react';
import { 
  Droplets, 
  Brain, 
  Clock, 
  Power,
  Leaf,
  CloudSun,
  CloudRain,
  ChevronRight,
  ShieldCheck,
  Activity,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const IrrigationPage: React.FC = () => {
  const { 
    isPumpActive, 
    pumpRemainingSeconds, 
    startWatering, 
    stopWatering, 
    irrigationMode, 
    setIrrigationMode, 
    sensorData,
    fuzzyDecision,
    setIsFuzzyModalOpen
  } = useFarm();

  const [durationMinutes, setDurationMinutes] = useState<number>(3);
  const estimatedVolumeLiters = (durationMinutes * 2.5).toFixed(1);

  const handleStart = () => {
    startWatering(durationMinutes * 60);
  };

  const isDelayed = fuzzyDecision.decision.toLowerCase().includes('tunda') || 
                    fuzzyDecision.decision.toLowerCase().includes('tidak');

  return (
    <div className="space-y-5 select-none relative pb-10">
      
      {/* 1. HERO HEADER BANNER (Consistent with Dashboard) */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-r from-[#EAF5EF] via-[#E2F0E8] to-[#D5EADF] border border-emerald-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3323] tracking-tight">
              Irigasi Tetes
            </h1>
            <span className="text-xl sm:text-2xl animate-bounce">💧</span>
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-[#1B5E3F] tracking-wide">
            Smart Drip Irrigation System • Otomasi Fuzzy Logic &amp; Pompa Air
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
            Kendalikan debit tetesan air tanaman semangka secara presisi dengan integrasi telemetri kelembapan tanah dan cuaca.
          </p>
        </div>

        {/* Mode Selector Pill Toggle */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/80 rounded-full border border-emerald-200/60 shadow-xs shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setIrrigationMode('AUTO')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              irrigationMode === 'AUTO'
                ? 'bg-[#135A3E] text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            AUTO (Fuzzy)
          </button>
          <button
            onClick={() => setIrrigationMode('MANUAL')}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              irrigationMode === 'MANUAL'
                ? 'bg-[#135A3E] text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            MANUAL (Pompa)
          </button>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (Matching Reference Architecture) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* ================= LEFT MAIN COLUMN (8 cols) ================= */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
          
          {/* Main 3D Irrigation Visual Card */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-7 space-y-4">
            
            {/* Header with Title and Status Badges */}
            <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Droplets className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Visual Alur Irigasi Tetes 3D
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
            <div className="relative rounded-2xl bg-gradient-to-b from-[#F7FAF7] to-white border border-slate-100/80 p-3 sm:p-5 overflow-hidden flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]">
              
              <div className="relative w-full max-w-xl flex items-center justify-center">
                <img 
                  src="/assets/drip_pipeline_3d.png" 
                  alt="Sistem Irigasi Tetes 3D"
                  className="w-full h-auto max-h-[170px] sm:max-h-[200px] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.01]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/drip_isometric.jpg';
                  }}
                />

                {/* Animated Water Droplets Overlay when pump is active */}
                {isPumpActive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="absolute top-[48%] left-[20%] right-[10%] h-1 bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-400 opacity-75 blur-[1px] animate-pulse" />
                    <div className="absolute top-[42%] right-[24%] animate-bounce text-cyan-500 text-xs">💧</div>
                    <div className="absolute top-[38%] right-[32%] animate-bounce text-cyan-500 text-xs [animation-delay:200ms]">💧</div>
                    <div className="absolute top-[44%] right-[40%] animate-bounce text-cyan-500 text-xs [animation-delay:400ms]">💧</div>
                  </div>
                )}
              </div>
            </div>

            {/* Flow Indicator Strip */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-4 text-[11px] sm:text-xs font-bold text-slate-600 pt-1 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">🛢️</span>
                <span>Tangki Air (780L)</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">⚡</span>
                <span>Pompa DC 12V</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">💧</span>
                <span>Drip Line 30cm</span>
              </div>
              <span className="text-slate-300 text-xs">➔</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F8F5] border border-slate-100">
                <span className="text-xs sm:text-sm">🍉</span>
                <span>Tanaman Semangka</span>
              </div>
            </div>

            {/* Manual Duration Preset Selector (Only in Manual Mode or for quick start) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Durasi:</span>
                {[1, 3, 5, 10].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDurationMinutes(mins)}
                    disabled={isPumpActive}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      durationMinutes === mins
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    {mins} Menit
                  </button>
                ))}
              </div>

              {/* Action Button: Mulai / Hentikan Penyiraman */}
              <div>
                {isPumpActive ? (
                  <button
                    onClick={stopWatering}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse"
                  >
                    <Power className="w-4 h-4" />
                    <span>⏹️ Hentikan Penyiraman ({pumpRemainingSeconds}s)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#135A3E] hover:bg-[#0E4931] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#135A3E]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>💧 Mulai Penyiraman ({durationMinutes} Menit)</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3 Input Variables Cards (Under Main Card) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Variable 1: Kelembapan Tanah */}
            <div className="rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Kelembapan</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Ideal
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight mb-2">
                {sensorData.soil_moisture}%
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-[#137A4D] rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, sensorData.soil_moisture)}%` }}
                />
              </div>
            </div>

            {/* Variable 2: Suhu Lingkungan */}
            <div className="rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                    <CloudSun className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Suhu Udara</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                  Normal
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight mb-2">
                {sensorData.temperature}°C
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Sensor DHT22 Stasiun Kebun
              </div>
            </div>

            {/* Variable 3: Probabilitas Hujan */}
            <div className="rounded-[22px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Peluang Hujan</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                  Tinggi
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight mb-2">
                {sensorData.weather_probability}%
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Integrasi Prakiraan BMKG
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (4 cols) ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-5">
          
          {/* Fuzzy System Decision Card */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Brain className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Keputusan Sistem
              </h3>
            </div>

            {/* Decision Status Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F0F7F2] border border-emerald-100/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
                <Clock className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-black text-emerald-950 truncate">
                  {fuzzyDecision.decision || 'Penyiraman Ditunda'}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Tanah cukup lembap + probabilitas hujan tinggi
                </p>
              </div>
            </div>

            {/* 4 Small Metrics Grid */}
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
              Lihat Detail Fuzzy Logic →
            </button>
          </div>

          {/* Telemetry Status Card */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Telemetri Aktuator
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-slate-500 font-medium">Relay Pompa Pin D23</span>
                <span className={`font-bold font-mono ${isPumpActive ? 'text-cyan-600' : 'text-slate-700'}`}>
                  {isPumpActive ? 'AKTIF (ON)' : 'STANDBY (OFF)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-slate-500 font-medium">Volume Dialirkan</span>
                <span className="font-bold text-slate-800 font-mono">12.5 Liter Hari Ini</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-slate-500 font-medium">Tekanan Pipa Drip</span>
                <span className="font-bold text-emerald-700 font-mono">1.2 Bar (Optimal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Calligraphy Watermark at Bottom Right matching reference */}
      <div className="flex justify-end pt-3 pr-2 pointer-events-none">
        <p className="font-['Caveat',cursive] text-emerald-800/60 text-lg sm:text-xl font-medium tracking-wide">
          Smart Farming for a Greener Future 🍃
        </p>
      </div>
    </div>
  );
};
