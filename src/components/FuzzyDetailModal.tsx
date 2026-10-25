import React from 'react';
import { X, Brain, ArrowDown } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const FuzzyDetailModal: React.FC = () => {
  const { isFuzzyModalOpen, setIsFuzzyModalOpen, sensorData, fuzzyDecision } = useFarm();

  if (!isFuzzyModalOpen) return null;

  // Linguistic labels
  const soilLabel = sensorData.soil_moisture < 45 ? 'Kering' : sensorData.soil_moisture <= 70 ? 'Sedang' : 'Basah';
  const tempLabel = sensorData.temperature < 26 ? 'Dingin' : sensorData.temperature <= 33 ? 'Sedang' : 'Panas';
  const rainLabel = sensorData.weather_probability < 35 ? 'Rendah' : sensorData.weather_probability <= 60 ? 'Sedang' : 'Tinggi';

  const isDelayed = fuzzyDecision.decision.toLowerCase().includes('tunda') || fuzzyDecision.decision.toLowerCase().includes('tidak');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[28px] shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#0B3323] to-[#124B34] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
              <Brain className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Fuzzy Decision</h2>
              <p className="text-[11px] text-emerald-200/80 font-medium">
                Metode Mamdani — Logika Keputusan Cerdas
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFuzzyModalOpen(false)}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Clean Minimal Flow */}
        <div className="p-6 space-y-4 text-center">
          {/* 1. INPUT */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
              INPUT
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-xl font-black font-mono text-emerald-700 block">
                  {sensorData.soil_moisture}%
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  Tanah
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-xl font-black font-mono text-slate-800 block">
                  {sensorData.temperature}°C
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  Suhu
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F7FAF7] border border-slate-100">
                <span className="text-xl font-black font-mono text-sky-600 block">
                  {sensorData.weather_probability}%
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  Hujan
                </span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 2. FUZZIFICATION */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
              FUZZIFICATION
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold">
                {soilLabel}
              </div>
              <div className="py-2 px-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                {tempLabel}
              </div>
              <div className="py-2 px-3 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 text-xs font-bold">
                {rainLabel}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 3. RULE */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block mb-1">
              RULE AKTIF
            </span>
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              Tanah cukup ({sensorData.soil_moisture}%) + peluang hujan tinggi ({sensorData.weather_probability}%)
            </p>
            <p className="text-xs font-bold text-amber-900 mt-0.5">
              ➔ Penyiraman ditunda untuk mencegah genangan air berlebih
            </p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-slate-300">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* 4. OUTPUT */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 border border-emerald-200/80">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
              OUTPUT KEPUTUSAN
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="text-left">
                <span className="text-[11px] text-slate-500 font-semibold block">Water Need</span>
                <span className="text-2xl font-black font-mono text-emerald-900">
                  {fuzzyDecision.water_need}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-semibold block">Keputusan</span>
                <span className={`text-sm font-black px-3 py-1 rounded-full border ${
                  isDelayed 
                    ? 'bg-amber-100 text-amber-900 border-amber-200' 
                    : 'bg-emerald-600 text-white border-emerald-600'
                }`}>
                  {fuzzyDecision.decision.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
