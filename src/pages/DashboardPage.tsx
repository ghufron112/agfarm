import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  CheckCircle2, 
  Play, 
  Square, 
  ChevronRight, 
  Plus, 
  Minus, 
  Brain, 
  CloudSun, 
  MapPin, 
  Sparkles,
  Sprout,
  Activity,
  Layers,
  Zap
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { IsometricDripView } from '../components/IsometricDripView';
import { weeklyIrrigationPerformance } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { 
    sensorData, 
    user, 
    fuzzyDecision, 
    setIsFuzzyModalOpen, 
    setCurrentPage, 
    isPumpActive, 
    pumpRemainingSeconds, 
    startWatering, 
    stopWatering, 
    irrigationMode, 
    setIrrigationMode, 
    manualDurationSeconds, 
    setManualDurationSeconds
  } = useFarm();

  const handleIncreaseDuration = () => {
    setManualDurationSeconds(Math.min(600, manualDurationSeconds + 15));
  };

  const handleDecreaseDuration = () => {
    setManualDurationSeconds(Math.max(15, manualDurationSeconds - 15));
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Card (Bespoke Glassmorphic Watermelon Banner) */}
      <div className="relative rounded-[32px] overflow-hidden glass-card p-6 sm:p-8 border border-white/90 dark:border-slate-800 bg-gradient-to-r from-white/95 via-emerald-50/40 to-teal-50/50 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-teal-950/30 shadow-[0_12px_36px_-6px_rgba(6,78,59,0.06)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)]">
        {/* Subtle decorative watermelon glow circles */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-400/8 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/20 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart IoT Irrigation • Fuzzy Logic 2.4</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              Halo, {user.name} 👋
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Pantau kondisi kebun semangka Anda secara real-time dan kelola irigasi dengan lebih mudah, presisi, dan hemat air.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-green-900 dark:from-emerald-700 dark:to-teal-900 text-white text-xs font-bold shadow-sm">
                <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                {user.farmName}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {user.location}
              </span>
            </div>
          </div>

          {/* Right Hero Image Card with subtle glossy border */}
          <div className="relative w-full lg:w-96 h-40 sm:h-48 rounded-[24px] overflow-hidden shadow-lg border-2 border-white/80 dark:border-slate-700 group">
            <img
              src="/assets/watermelon_hero.jpg"
              alt="Kebun Semangka"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                Semangka Sehat, Hasil Maksimal! 🌱
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Sensor Cards Row (4 Fluid Glass Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {/* Card 1: Kelembapan Tanah */}
        <div className="glass-card rounded-[26px] p-5.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kelembapan Tanah</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-1 ring-emerald-500/20 dark:ring-emerald-500/40 group-hover:scale-110 transition-transform">
              <Droplets className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
              {sensorData.soil_moisture}%
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
              Ideal
            </span>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2.5 font-medium">Target Fase: (40% - 70%)</p>
          
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, sensorData.soil_moisture)}%` }}
            />
          </div>
        </div>

        {/* Card 2: Suhu */}
        <div className="glass-card rounded-[26px] p-5.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Suhu Udara</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center ring-1 ring-amber-500/20 dark:ring-amber-500/40 group-hover:scale-110 transition-transform">
              <Thermometer className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
              {sensorData.temperature}°C
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
              Normal
            </span>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2.5 font-medium">Rentang: (25°C - 35°C)</p>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (sensorData.temperature / 45) * 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3: Kelembapan Udara */}
        <div className="glass-card rounded-[26px] p-5.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-sky-500/10 transition-colors" />

          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kelembapan Udara</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center ring-1 ring-sky-500/20 dark:ring-sky-500/40 group-hover:scale-110 transition-transform">
              <Wind className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
              {sensorData.humidity}%
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40">
              Normal
            </span>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2.5 font-medium">Batas Aman: (50% - 80%)</p>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, sensorData.humidity)}%` }}
            />
          </div>
        </div>

        {/* Card 4: Volume Air Hari Ini */}
        <div className="glass-card rounded-[26px] p-5.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Volume Air Hari Ini</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center ring-1 ring-purple-500/20 dark:ring-purple-500/40 group-hover:scale-110 transition-transform">
              <Droplets className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
              {sensorData.water_volume_today} L
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
              ↓ 18%
            </span>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2 font-medium">dibanding kemarin</p>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Efisiensi irigasi meningkat
          </div>
        </div>
      </div>

      {/* 3. Main Split Grid (Left: Irrigation & Charts, Right: Weather & Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Status Irigasi (Large Card with Isometric View) */}
          <div className="glass-card rounded-[32px] p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center ring-1 ring-sky-500/20 dark:ring-sky-500/40">
                  <Droplets className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Status Irigasi</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400">Monitoring Drip Irrigation &amp; IoT ESP32</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isPumpActive 
                    ? 'bg-emerald-500 text-white animate-pulse shadow-md shadow-emerald-500/25' 
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isPumpActive ? 'bg-white' : 'bg-emerald-500'}`} />
                  {isPumpActive ? `Menyiram (${pumpRemainingSeconds}s)` : 'Tidak Menyiram'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700">
                  Mode: {irrigationMode === 'AUTO' ? 'Otomatis' : 'Manual'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Fuzzy Logic Subcard on left */}
              <div className="md:col-span-5 space-y-3.5">
                <div className="p-4.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                    <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Keputusan Sistem (Fuzzy Logic)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                      {fuzzyDecision.decision}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {fuzzyDecision.reasons.join(' dan ')}. Sistem memperkirakan penyiraman belum diperlukan.
                  </p>

                  <button
                    onClick={() => setIsFuzzyModalOpen(true)}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 hover:underline"
                  >
                    Lihat Detail Keputusan <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick IoT Telemetry Mini-Stat */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-semibold">Flow Rate</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{isPumpActive ? '2.5 L/m' : '0.0 L/m'}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-semibold">Level Tangki</span>
                    <span className="font-bold text-sky-700 dark:text-sky-400 font-mono">{sensorData.water_level}% (780 L)</span>
                  </div>
                </div>
              </div>

              {/* 3D Isometric View */}
              <div className="md:col-span-7">
                <IsometricDripView />
              </div>
            </div>
          </div>

          {/* Row of 2 Cards: Performa Irigasi Bar Chart & Penggunaan Air */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Performa Irigasi (7 Hari Terakhir) */}
            <div className="md:col-span-8 glass-card rounded-[28px] p-5.5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    Performa Irigasi (7 Hari Terakhir)
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> Volume Air (L)
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-sm bg-teal-400" /> Durasi Pompa (m)
                  </span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100 dark:border-slate-800">
                {weeklyIrrigationPerformance.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                      {/* Volume bar */}
                      <div
                        className="w-3 sm:w-4 bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-sm group-hover:from-sky-700 group-hover:to-sky-500 transition-all duration-300 relative"
                        style={{ height: `${(item.volume / 35) * 100}%` }}
                        title={`${item.volume} Liter`}
                      />
                      {/* Duration bar */}
                      <div
                        className="w-3 sm:w-4 bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-sm group-hover:from-teal-600 group-hover:to-teal-400 transition-all duration-300 relative"
                        style={{ height: `${(item.duration / 80) * 100}%` }}
                        title={`${item.duration} Menit`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Penggunaan Air (Total & Sparkline) */}
            <div className="md:col-span-4 glass-card rounded-[28px] p-5.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Droplets className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Penggunaan Air</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 font-mono">{sensorData.weekly_water_usage} L</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  ↓ 22% <span className="text-slate-400 dark:text-slate-500 font-normal">dari minggu lalu</span>
                </div>
              </div>

              {/* Sparkline curve simulation */}
              <div className="py-2">
                <svg className="w-full h-12" viewBox="0 0 100 40">
                  <path
                    d="M 5 28 Q 20 18 35 24 T 65 14 T 95 20"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="5" cy="28" r="3" fill="#0284C7" />
                  <circle cx="35" cy="24" r="3" fill="#0284C7" />
                  <circle cx="65" cy="14" r="3" fill="#0284C7" />
                  <circle cx="95" cy="20" r="3" fill="#0284C7" />
                </svg>
                <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-medium px-1">
                  <span>Sen</span>
                  <span>Sel</span>
                  <span>Rab</span>
                  <span>Kam</span>
                  <span>Jum</span>
                  <span>Sab</span>
                  <span>Min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row of 2 Cards: Kondisi Tanaman Semangka & Aktivitas Terbaru */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Kondisi Tanaman Semangka */}
            <div className="md:col-span-7 glass-card rounded-[28px] p-5.5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sprout className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                  Kondisi Tanaman Semangka
                </h3>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/assets/watermelon_plant.jpg"
                  alt="Tanaman Semangka"
                  className="w-20 h-20 rounded-2xl object-cover border border-emerald-100 dark:border-slate-700 shadow-sm shrink-0"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Semangka</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      {user.plantAgeHst} HST
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Fase: <strong className="text-slate-700 dark:text-slate-200">{user.growthStage}</strong>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Umur: <strong className="text-slate-700 dark:text-slate-200">{user.plantAgeHst} Hari Setelah Tanam</strong>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Target Kelembapan: <strong className="text-emerald-700 dark:text-emerald-400">50% - 70%</strong>
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 mb-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Kondisi Tanaman:</span>
                  <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[88%]" />
                  </div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">Baik</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('tanaman')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                Lihat Detail Tanaman <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Aktivitas Terbaru (Timeline) */}
            <div className="md:col-span-5 glass-card rounded-[28px] p-5.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Aktivitas Terbaru</h3>
                  <button
                    onClick={() => setCurrentPage('riwayat')}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    Lihat Semua <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0 shadow-xs" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">08:45</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Data sensor diperbarui</span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">Kelembapan tanah {sensorData.soil_moisture}%</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-sky-500 mt-1 shrink-0 shadow-xs" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">07:30</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Prediksi cuaca diperbarui</span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">Kemungkinan hujan {sensorData.weather_probability}%</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1 shrink-0 shadow-xs" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">06:12</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Sistem menunda penyiraman</span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">Karena prediksi hujan tinggi</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0 shadow-xs" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">Kemarin 18:00</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Penyiraman manual</span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">Durasi 60 detik • 4.2 L</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Cuaca Hari Ini */}
          <div className="glass-card rounded-[28px] p-5.5">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <CloudSun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Cuaca Hari Ini</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">Sen, 27 Okt 2025</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                Batuampar, Sumenep
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/60 dark:from-sky-950/40 dark:to-blue-950/40 border border-sky-100/70 dark:border-sky-800/40 mb-3.5">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{sensorData.temperature}°C</span>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">Cerah Berawan</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">Kemungkinan Hujan</span>
                <span className="text-xl font-black text-sky-600 dark:text-sky-400 font-mono">{sensorData.weather_probability}%</span>
              </div>
            </div>

            {/* 3-day forecast cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Besok</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block my-1">28° / 32°</span>
                <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold block">Hujan Ringan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Rabu</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block my-1">27° / 31°</span>
                <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold block">Hujan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Kamis</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block my-1">26° / 30°</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold block">Berawan</span>
              </div>
            </div>
          </div>

          {/* Card 2: Keputusan Hari Ini (Fuzzy Summary) */}
          <div className="glass-card rounded-[28px] p-5.5">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Keputusan Hari Ini</h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/60">
                  {fuzzyDecision.decision}
                </span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 font-medium text-xs block mb-1.5">Alasan:</span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Kelembapan tanah {sensorData.soil_moisture}% (cukup)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Suhu {sensorData.temperature}°C (normal)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Probabilitas hujan {sensorData.weather_probability}% (tinggi)</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsFuzzyModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Kontrol Manual */}
          <div className="glass-card rounded-[28px] p-5.5">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-teal-600" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Kontrol Manual</h3>
            </div>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 border border-slate-200/50 dark:border-slate-700">
              <button
                onClick={() => setIrrigationMode('AUTO')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  irrigationMode === 'AUTO'
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Auto
              </button>
              <button
                onClick={() => setIrrigationMode('MANUAL')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  irrigationMode === 'MANUAL'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Manual
              </button>
            </div>

            {/* Duration Selector */}
            <div className="mb-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1.5">
                Durasi Penyiraman
              </span>
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <button
                  onClick={handleDecreaseDuration}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-95 transition-transform shadow-2xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="text-center font-mono">
                  <span className="text-base font-black text-slate-900 dark:text-slate-100">{manualDurationSeconds}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">detik</span>
                </div>
                <button
                  onClick={handleIncreaseDuration}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 active:scale-95 transition-transform shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Big Action Button */}
            {isPumpActive ? (
              <button
                onClick={stopWatering}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-extrabold shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 animate-pulse"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Hentikan Siram ({pumpRemainingSeconds}s)</span>
              </button>
            ) : (
              <button
                onClick={() => startWatering(manualDurationSeconds)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai Siram</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom System Status Bar */}
      <footer className="pt-4 border-t border-slate-200/50 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">AG Farm</span>
          <span>•</span>
          <span>Smart Irrigation &amp; Farming System</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sistem Online
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            ESP32 Terhubung
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            ⚡ Supabase Ready
          </span>
        </div>
      </footer>
    </div>
  );
};
