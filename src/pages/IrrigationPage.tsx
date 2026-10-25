import React, { useState } from 'react';
import { 
  Droplets, 
  Play, 
  Square, 
  Sliders, 
  Gauge, 
  Clock, 
  Zap, 
  Calendar, 
  ShieldCheck, 
  Activity, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { IsometricDripView } from '../components/IsometricDripView';

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
  const [selectedZone, setSelectedZone] = useState<string>('Zona 1 (Vegetatif 35 HST)');
  const [targetMoisture, setTargetMoisture] = useState<number>(65);

  const estimatedVolumeLiters = (durationMinutes * 2.5).toFixed(1);

  const handleStart = () => {
    startWatering(durationMinutes * 60);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💧</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Smart Irrigation Control
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Kendali presisi irigasi tetes berbasis IoT ESP32, Fuzzy Logic, dan sensor kelembapan tanah.
          </p>
        </div>

        {/* Global Mode Switch */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shrink-0 border border-slate-200/50 dark:border-slate-700">
          <button
            onClick={() => setIrrigationMode('AUTO')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              irrigationMode === 'AUTO'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🤖 Mode Otomatis (Fuzzy)
          </button>
          <button
            onClick={() => setIrrigationMode('MANUAL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              irrigationMode === 'MANUAL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ✋ Kontrol Manual
          </button>
        </div>
      </div>

      {/* Main Irrigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Big Control & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Pump Actuation Card */}
          <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isPumpActive ? 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Kontrol Pompa Submersible</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-400">Pompa DC 12V 4.5A terhubung ke Relay ESP32</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPumpActive 
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 animate-pulse' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {isPumpActive ? '⚡ AKTIF' : 'SIAGA (OFF)'}
              </span>
            </div>

            {/* Big Action Button */}
            {isPumpActive ? (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-center space-y-3 shadow-lg shadow-rose-500/25">
                <div className="text-xs uppercase tracking-wider font-bold text-rose-100">
                  Penyiraman Sedang Berlangsung
                </div>
                <div className="text-5xl font-black font-mono">
                  {String(Math.floor(pumpRemainingSeconds / 60)).padStart(2, '0')}:
                  {String(pumpRemainingSeconds % 60).padStart(2, '0')}
                </div>
                <p className="text-xs text-rose-100">
                  Air dialirkan melalui pipa lateral drip emitters ke zona perakaran semangka.
                </p>
                <button
                  onClick={stopWatering}
                  className="px-8 py-3 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-2 mx-auto"
                >
                  <Square className="w-4 h-4 fill-rose-700" />
                  HENTIKAN PENYIRAMAN SEKARANG
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center space-y-4 shadow-lg shadow-emerald-600/20">
                <div className="text-xs uppercase tracking-wider font-bold text-emerald-100">
                  {irrigationMode === 'AUTO' ? 'Sistem Siap (Mode Otomatis Aktif)' : 'Mode Manual Siaga'}
                </div>
                <div className="text-2xl font-black">
                  Mulai Penyiraman Presisi Tanaman Semangka
                </div>
                <p className="text-xs text-emerald-100 max-w-md mx-auto">
                  Estimasi penyiraman selama <strong>{durationMinutes} menit</strong> akan mengalirkan{' '}
                  <strong>{estimatedVolumeLiters} Liter</strong> air bersih ke tanaman.
                </p>
                <button
                  onClick={handleStart}
                  className="px-8 py-3.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-extrabold shadow-md transition-all active:scale-95 flex items-center gap-2.5 mx-auto"
                >
                  <Play className="w-4 h-4 fill-emerald-800" />
                  💧 MULAI MENYIRAM SEKARANG
                </button>
              </div>
            )}

            {/* Sliders & Parameters */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Durasi Penyiraman</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{durationMinutes} Menit ({durationMinutes * 60} Detik)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  <span>1 Menit (Ringan)</span>
                  <span>5 Menit (Sedang)</span>
                  <span>10 Menit (Maksimal)</span>
                </div>
              </div>

              {/* Target Moisture Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Target Kelembapan Tanah Otomatis</span>
                  <span className="text-sky-700 dark:text-sky-400 font-extrabold">{targetMoisture}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="80"
                  value={targetMoisture}
                  onChange={(e) => setTargetMoisture(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  <span>40% (Batas Bawah)</span>
                  <span>60-70% (Optimal Semangka)</span>
                  <span>80% (Batas Jenuh)</span>
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold block">Estimasi Volume</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-100">{estimatedVolumeLiters} L</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold block">Flow Rate</span>
                <span className="text-base font-black text-emerald-700 dark:text-emerald-400">{isPumpActive ? '2.5 L/m' : '2.5 L/m (Cal)'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold block">Tekanan Pipa</span>
                <span className="text-base font-black text-sky-700 dark:text-sky-400">1.8 Bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Isometric View & Zones (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[32px] p-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Diagram Fisik Drip Irrigation</span>
            </h3>
            <IsometricDripView />
          </div>

          {/* Irrigation Zones Card */}
          <div className="glass-card rounded-[32px] p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Zona Irigasi Kebun Semangka</h3>
            
            <div className="space-y-2">
              {[
                { name: 'Zona 1 (Vegetatif 35 HST)', area: '0.6 Ha', moisture: sensorData.soil_moisture, status: 'Aktif Terhubung' },
                { name: 'Zona 2 (Berbunga 42 HST)', area: '0.5 Ha', moisture: 58, status: 'Normal' },
                { name: 'Zona 3 (Pembibitan / Tanam)', area: '0.4 Ha', moisture: 70, status: 'Lembap Cukup' }
              ].map((zone, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedZone(zone.name)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    selectedZone === zone.name
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-2xs font-bold text-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-50/60 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <p className="font-bold">{zone.name}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400 font-normal">Luas: {zone.area}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">{zone.moisture}%</span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{zone.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto Fuzzy Trigger Card */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">Fuzzy Logic Auto-Check:</span>
                <span className="font-extrabold text-purple-700 dark:text-purple-300">{fuzzyDecision.decision}</span>
              </div>
              <p className="text-[11px] text-purple-700/80 dark:text-purple-300/80 mb-2">
                Sistem menghitung kebutuhan air {fuzzyDecision.water_need}% berdasarkan kelembapan dan ramalan hujan.
              </p>
              <button
                onClick={() => setIsFuzzyModalOpen(true)}
                className="text-purple-800 dark:text-purple-300 font-extrabold underline hover:text-purple-950 dark:hover:text-purple-200"
              >
                Buka Matriks Aturan Fuzzy →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
