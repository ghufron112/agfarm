import React, { useState } from 'react';
import { 
  Droplets, 
  Thermometer, 
  CloudRain, 
  Gauge, 
  Play, 
  Square, 
  ChevronRight, 
  Brain, 
  CloudSun, 
  CheckCircle2, 
  Plus, 
  Minus,
  Sparkles,
  Wifi,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const DashboardPage: React.FC = () => {
  const { 
    sensorData, 
    user, 
    fuzzyDecision, 
    setIsFuzzyModalOpen, 
    isPumpActive, 
    pumpRemainingSeconds, 
    startWatering, 
    stopWatering, 
    irrigationMode, 
    setIrrigationMode, 
    manualDurationSeconds, 
    setManualDurationSeconds,
    demoMode
  } = useFarm();

  const [chartTab, setChartTab] = useState<'kelembapan' | 'penggunaan'>('kelembapan');
  const [chartFilter, setChartFilter] = useState<'7' | '30'>('7');

  const handleIncreaseDuration = () => {
    setManualDurationSeconds(Math.min(600, manualDurationSeconds + 15));
  };

  const handleDecreaseDuration = () => {
    setManualDurationSeconds(Math.max(15, manualDurationSeconds - 15));
  };

  // 7-day data for chart
  const weeklyData = [
    { day: 'Sen', date: '21 Okt', moisture: 58, usage: 14.2 },
    { day: 'Sel', date: '22 Okt', moisture: 64, usage: 16.5 },
    { day: 'Rab', date: '23 Okt', moisture: 60, usage: 8.4 },
    { day: 'Kam', date: '24 Okt', moisture: 62, usage: 12.0 },
    { day: 'Jum', date: '25 Okt', moisture: 59, usage: 15.2 },
    { day: 'Sab', date: '26 Okt', moisture: 65, usage: 11.0 },
    { day: 'Min', date: '27 Okt', moisture: sensorData.soil_moisture, usage: sensorData.water_volume_today },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Master Command Center Hero Banner */}
      <div className="relative rounded-[28px] overflow-hidden glass-card p-6 sm:p-8 border border-emerald-500/20 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-emerald-950/30 shadow-md">
        {/* Soft Ambient Vector Glows (Clean & Modern) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Left Column: Greeting, Farm Identity & Key Specs */}
          <div className="space-y-4 max-w-2xl text-left">
            {/* Top Tag & Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/50 text-xs font-bold shadow-2xs">
                <span>🍉</span>
                <span>{user.plantVariety}</span>
                <span className="text-emerald-400 dark:text-emerald-600">•</span>
                <span>Fase Vegetatif (35 HST)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ESP32 Online</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Update: {sensorData.last_updated}</span>
              </span>
            </div>

            {/* Main Greeting & Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Halo, {user.name} 👋
              </h1>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                Sistem Irigasi Tetes Cerdas Semangka Berbasis Fuzzy Logic
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Memantau kelengasan tanah, suhu mikroklimat, dan prediksi curah hujan cuaca secara real-time untuk efisiensi air presisi di lahan penelitian Batuampar, Sumenep.
            </p>

            {/* Live Operational Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                Drip Emitter: Aktif
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
                🎯 Target Lengas: 50% – 70%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
                📍 Batuampar, Sumenep
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
                💧 Efisiensi: +38.5% Air
              </span>
            </div>
          </div>

          {/* Right Column: Telemetry & Fuzzy Quick Card */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/90 backdrop-blur-md border border-emerald-500/20 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Status Tanaman & Irigasi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-300/60 dark:border-emerald-600/50">
                  PRIMA 🌱
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-medium block">Keputusan Fuzzy</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {fuzzyDecision.decision === 'WATER' ? 'Penyiraman Aktif' : 'Standby / Cukup'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-medium block">Kebutuhan Air</span>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">
                    {fuzzyDecision.defuzzifiedValue}%
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsFuzzyModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-600/20 cursor-pointer active:scale-98"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Lihat Alur Logika Fuzzy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Validasi Penelitian Skripsi</span>
              </span>
              <span className="font-mono text-[10px]">Tahun 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4 Sensor Cards (User prompt Section 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Kelembapan Tanah */}
        <div className="glass-card rounded-[24px] p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kelembapan Tanah
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform">
              <Droplets className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
              {sensorData.soil_moisture}%
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Ideal
            </span>
          </div>

          <p className="text-[11px] text-slate-400 font-medium mb-2.5">
            Range Target: 40–70%
          </p>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, sensorData.soil_moisture)}%` }}
            />
          </div>
        </div>

        {/* Card 2: Suhu */}
        <div className="glass-card rounded-[24px] p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Suhu
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center ring-1 ring-amber-500/20 group-hover:scale-110 transition-transform">
              <Thermometer className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
              {sensorData.temperature}°C
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Normal
            </span>
          </div>

          <p className="text-[11px] text-slate-400 font-medium mb-2.5">
            Rentang Optimal: 25–35°C
          </p>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (sensorData.temperature / 45) * 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3: Level Air */}
        <div className="glass-card rounded-[24px] p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Level Air Tangki
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center ring-1 ring-sky-500/20 group-hover:scale-110 transition-transform">
              <Gauge className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
              {sensorData.water_level}%
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Aman
            </span>
          </div>

          <p className="text-[11px] text-slate-400 font-medium mb-2.5">
            Kapasitas: 780 L / 1000 L
          </p>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${sensorData.water_level}%` }}
            />
          </div>
        </div>

        {/* Card 4: Probabilitas Hujan */}
        <div className="glass-card rounded-[24px] p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Probabilitas Hujan
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center ring-1 ring-purple-500/20 group-hover:scale-110 transition-transform">
              <CloudRain className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
              {sensorData.weather_probability}%
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              {sensorData.weather_probability >= 60 ? 'Tinggi' : 'Rendah'}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 font-medium mb-2.5">
            {sensorData.weather_probability >= 60 ? 'Memicu penundaan irigasi' : 'Penyiraman normal'}
          </p>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${sensorData.weather_probability}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Main Two Columns: Status Irigasi & Fuzzy Decision (Sections 8 & 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Status Irigasi with Pipeline Visualization */}
        <div className="lg:col-span-7 glass-card rounded-[32px] p-6 sm:p-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isPumpActive ? 'bg-cyan-100 text-cyan-600 animate-pulse' : 'bg-slate-100 text-slate-600'
              }`}>
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Status Irigasi</h2>
                <p className="text-xs text-slate-400 font-medium">Monitoring Drip Irrigation &amp; Pompa Submersible</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPumpActive 
                  ? 'bg-cyan-500 text-white animate-pulse shadow-md shadow-cyan-500/25' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isPumpActive ? 'bg-white' : 'bg-emerald-500'}`} />
                {isPumpActive ? `Menyiram (${pumpRemainingSeconds}s)` : 'Tidak Menyiram'}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Mode: {irrigationMode}
              </span>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPumpActive ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
              }`}>
                Pompa: {isPumpActive ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>

          {/* Pipeline Alur Visual: Tangki -> Pompa -> Selang -> Drip Irrigation -> 🍉 Semangka */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="uppercase tracking-wider text-[11px] text-slate-400">Alur Aliran Irigasi Tetes</span>
              {isPumpActive ? (
                <span className="text-cyan-600 font-mono font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                  Air Mengalir 2.5 L/m
                </span>
              ) : (
                <span className="text-slate-400 font-medium">Pompa Siaga (Standby)</span>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs pt-1">
              {/* Step 1: Tangki */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center">
                <span className="text-lg mb-1">🛢️</span>
                <span className="font-extrabold text-slate-800">Tangki</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">780 L</span>
              </div>

              {/* Step 2: Pompa */}
              <div className={`p-3 rounded-xl border shadow-2xs flex flex-col items-center transition-all ${
                isPumpActive 
                  ? 'bg-cyan-500 text-white border-cyan-400 animate-pulse' 
                  : 'bg-white border-slate-200/80 text-slate-800'
              }`}>
                <span className="text-lg mb-1">⚡</span>
                <span className="font-extrabold">Pompa</span>
                <span className={`text-[10px] font-mono mt-0.5 ${isPumpActive ? 'text-white' : 'text-slate-400'}`}>
                  {isPumpActive ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* Step 3: Selang */}
              <div className={`p-3 rounded-xl border shadow-2xs flex flex-col items-center transition-all ${
                isPumpActive ? 'bg-sky-50 border-sky-300 text-sky-900' : 'bg-white border-slate-200/80 text-slate-800'
              }`}>
                <span className="text-lg mb-1">〰️</span>
                <span className="font-extrabold">Selang</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">PE 16mm</span>
              </div>

              {/* Step 4: Drip */}
              <div className={`p-3 rounded-xl border shadow-2xs flex flex-col items-center transition-all ${
                isPumpActive ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-white border-slate-200/80 text-slate-800'
              }`}>
                <span className="text-lg mb-1">{isPumpActive ? '💧' : '🚿'}</span>
                <span className="font-extrabold">Drip Line</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">2 L/jam</span>
              </div>

              {/* Step 5: Semangka */}
              <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col items-center">
                <span className="text-lg mb-1">🍉</span>
                <span className="font-extrabold text-emerald-800">Semangka</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Akar Lembap</span>
              </div>
            </div>

            {/* Visual Flow Animation Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden relative">
              {isPumpActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-500 animate-[waterDrip_1.5s_infinite]" />
              )}
            </div>
          </div>

          {/* Quick Manual Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
            {/* Mode Switch & Duration */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-bold text-slate-600 ml-2">Durasi Manual</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecreaseDuration}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-900 w-12 text-center">
                  {manualDurationSeconds}s
                </span>
                <button
                  onClick={handleIncreaseDuration}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Button */}
            {isPumpActive ? (
              <button
                onClick={stopWatering}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 animate-pulse"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Hentikan Siram ({pumpRemainingSeconds}s)</span>
              </button>
            ) : (
              <button
                onClick={() => startWatering(manualDurationSeconds)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai Menyiram Manual</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Fuzzy Logic Decision Card (Section 9) */}
        <div className="lg:col-span-5 glass-card rounded-[32px] p-6 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Keputusan Sistem</h2>
                  <p className="text-xs text-slate-400">Algoritma Fuzzy Logic Mamdani</p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Rule Active
              </span>
            </div>

            {/* Big Decision Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 space-y-2">
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider block">
                Status Keputusan
              </span>
              <div className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{fuzzyDecision.decision.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-200/60 font-semibold text-emerald-900">
                <span>Output Kebutuhan Air:</span>
                <span className="font-mono font-extrabold text-sm">{fuzzyDecision.water_need}%</span>
              </div>
            </div>

            {/* Reasons / Inputs List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Parameter Input:</span>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Kelembapan Tanah
                  </span>
                  <span className="font-mono font-bold text-slate-800">{sensorData.soil_moisture}%</span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Suhu Udara
                  </span>
                  <span className="font-mono font-bold text-slate-800">{sensorData.temperature}°C</span>
                </li>
                <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Probabilitas Hujan
                  </span>
                  <span className="font-mono font-bold text-slate-800">{sensorData.weather_probability}%</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Detail Button */}
          <button
            onClick={() => setIsFuzzyModalOpen(true)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
          >
            <span>Lihat Detail Logika Fuzzy</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Bottom Split: Single Main Chart & Quick Weather (Sections 11 & 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Single Main Chart (8 cols) */}
        <div className="lg:col-span-8 glass-card rounded-[32px] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Kondisi &amp; Penggunaan Air
              </h2>
              <p className="text-xs text-slate-400">
                {chartTab === 'kelembapan' 
                  ? 'Riwayat kelembapan tanah zona perakaran semangka' 
                  : 'Total debit konsumsi air irigasi tetes'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab: Kelembapan | Penggunaan Air */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setChartTab('kelembapan')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartTab === 'kelembapan' 
                      ? 'bg-white text-emerald-800 shadow-2xs font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Kelembapan
                </button>
                <button
                  onClick={() => setChartTab('penggunaan')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartTab === 'penggunaan' 
                      ? 'bg-white text-emerald-800 shadow-2xs font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Penggunaan Air
                </button>
              </div>

              {/* Filter: 7 Hari | 30 Hari */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setChartFilter('7')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    chartFilter === '7' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  7 Hari
                </button>
                <button
                  onClick={() => setChartFilter('30')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    chartFilter === '30' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  30 Hari
                </button>
              </div>
            </div>
          </div>

          {/* Clean Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100">
            {weeklyData.map((item, idx) => {
              const value = chartTab === 'kelembapan' ? item.moisture : item.usage;
              const maxScale = chartTab === 'kelembapan' ? 80 : 25;
              const heightPercent = Math.min(100, (value / maxScale) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {value}{chartTab === 'kelembapan' ? '%' : 'L'}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 shadow-2xs ${
                      chartTab === 'kelembapan'
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-700 group-hover:to-teal-500'
                        : 'bg-gradient-to-t from-sky-600 to-sky-400 group-hover:from-sky-700 group-hover:to-sky-500'
                    }`}
                    style={{ height: `${heightPercent * 1.3}px` }}
                    title={`${item.date}: ${value} ${chartTab === 'kelembapan' ? '%' : 'Liter'}`}
                  />
                  <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              {chartTab === 'kelembapan' ? 'Target Fase Vegetatif: 50% - 70%' : 'Rata-rata Konsumsi: 12.4 L / hari'}
            </span>
            <span className="text-emerald-700 font-bold">
              {chartTab === 'kelembapan' ? '✓ Kelembapan Stabil' : '✓ Efisiensi Air +22%'}
            </span>
          </div>
        </div>

        {/* Quick Weather (4 cols - Section 12) */}
        <div className="lg:col-span-4 glass-card rounded-[32px] p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <CloudSun className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-extrabold text-slate-900">Cuaca Hari Ini</h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                Sumenep
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/70 border border-sky-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black text-slate-900 font-mono">
                  {sensorData.temperature}°C
                </span>
                <span className="text-xs font-bold text-sky-800 bg-white/80 px-2.5 py-1 rounded-full border border-sky-200">
                  Cerah Berawan
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>Probabilitas Hujan:</span>
                <span className="font-extrabold font-mono text-sky-700 text-sm">
                  {sensorData.weather_probability}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
              <span className="text-sm">🌧️</span>
              <p className="font-medium leading-relaxed">
                {sensorData.weather_probability >= 60 
                  ? 'Hujan diperkirakan dalam beberapa jam. Sistem Fuzzy Logic otomatis menunda penyiraman.'
                  : 'Cuaca stabil hari ini. Sirkulasi irigasi berjalan sesuai kelembapan tanah.'}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-medium text-center pt-2 border-t border-slate-100">
            Sumber Data: Stasiun Mikroklimat IoT &amp; BMKG API
          </div>
        </div>
      </div>
    </div>
  );
};
