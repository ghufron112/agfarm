import React, { useState } from 'react';
import { 
  Sprout, 
  Calendar, 
  Ruler, 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  HeartPulse,
  Info
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { watermelonGrowthData } from '../data/mockData';

export const PlantConditionPage: React.FC = () => {
  const { user, sensorData } = useFarm();
  const [selectedHst, setSelectedHst] = useState<number>(35);

  const growthStages = [
    { name: 'Tanam', range: '0 - 10 HST', icon: '🌱', status: 'completed' },
    { name: 'Vegetatif', range: '11 - 35 HST', icon: '🌿', status: 'current' },
    { name: 'Berbunga', range: '36 - 45 HST', icon: '🌼', status: 'upcoming' },
    { name: 'Pembentukan Buah', range: '46 - 65 HST', icon: '🍉', status: 'upcoming' },
    { name: 'Panen', range: '66 - 75 HST', icon: '🍉', status: 'upcoming' },
  ];

  const currentPoint = watermelonGrowthData.find(d => d.hst === selectedHst) || watermelonGrowthData[6];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🍉</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Kondisi &amp; Pertumbuhan Tanaman Semangka
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitoring morfologi fisiologis varietas <strong>{user.plantVariety}</strong> (35 HST Fase Vegetatif).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200/80 text-emerald-800 text-xs font-bold">
          <HeartPulse className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Status Kesehatan: Prima (92/100)</span>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="glass-card rounded-[32px] p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Plant Photo */}
          <div className="md:col-span-5 relative group">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-md border border-slate-100">
              <img
                src="/assets/watermelon_plant.jpg"
                alt="Tanaman Semangka Lapangan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-2xl p-3 text-white text-xs flex items-center justify-between">
              <span className="font-semibold">Foto Lapangan Aktif</span>
              <span className="text-[10px] text-emerald-300 font-mono">Batuampar Block A</span>
            </div>
          </div>

          {/* Plant Details & Badges */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Spesies: Citrullus lanatus
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Semangka Inul Hibrida Madura
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 block font-medium">Umur Tanaman</span>
                <span className="text-xl font-black text-slate-800">{user.plantAgeHst} HST</span>
                <span className="text-[10px] text-slate-500 block">Hari Setelah Tanam</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[11px] text-emerald-600 block font-medium">Fase Saat Ini</span>
                <span className="text-xl font-black text-emerald-900">{user.growthStage}</span>
                <span className="text-[10px] text-emerald-700 block">Pertumbuhan Daun &amp; Sulur</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] text-sky-600 block font-medium">Target Kelembapan</span>
                <span className="text-xl font-black text-sky-900">50% - 70%</span>
                <span className="text-[10px] text-sky-700 block">Aktual: {sensorData.soil_moisture}%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Evaluasi Kondisi Tanaman:</span>
              </div>
              <p>
                Pertumbuhan sulur utama telah mencapai <strong>68 cm</strong> dengan <strong>62 helai daun</strong> yang hijau segar tanpa tanda klorosis. Sistem perakaran menyerap air secara optimal berkat kelembapan tanah yang terjaga stabil di 62% melalui irigasi tetes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline of Growth Stages */}
      <div className="glass-card rounded-[32px] p-6 sm:p-7 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Timeline Fase Pertumbuhan Semangka (0 - 75 HST)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {growthStages.map((stage, idx) => {
            const isCurrent = stage.status === 'current';
            const isCompleted = stage.status === 'completed';
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 border-emerald-600'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}
              >
                <div className="text-2xl mb-1">{stage.icon}</div>
                <h4 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-800'}`}>
                  {stage.name}
                </h4>
                <span className={`text-[10px] block mt-1 font-mono ${isCurrent ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {stage.range}
                </span>
                {isCurrent && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-white text-emerald-800 text-[9px] font-extrabold uppercase">
                    Fase Aktif
                  </span>
                )}
                {isCompleted && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600">
                    ✓ Selesai
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Growth Tracking Morphometrics */}
      <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Growth Tracking &amp; Parameter Morfologi</h3>
            <p className="text-xs text-slate-400">Pilih titik HST untuk melihat perkembangan tanaman</p>
          </div>

          {/* Quick HST point buttons */}
          <div className="flex flex-wrap gap-1.5">
            {watermelonGrowthData.slice(0, 7).map((d) => (
              <button
                key={d.hst}
                onClick={() => setSelectedHst(d.hst)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedHst === d.hst
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.hst} HST
              </button>
            ))}
          </div>
        </div>

        {/* Selected HST metrics cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Panjang Sulur / Tinggi</span>
            <span className="text-3xl font-black text-slate-800">{currentPoint.heightCm} cm</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">+15.6 cm dari 30 HST</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Jumlah Daun Utama</span>
            <span className="text-3xl font-black text-emerald-700">{currentPoint.leaves} Helai</span>
            <span className="text-[10px] text-slate-400 block mt-1">Kerapatan kanopi baik</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Bunga Terbentuk</span>
            <span className="text-3xl font-black text-amber-600">{currentPoint.fruitCount} Calon</span>
            <span className="text-[10px] text-slate-400 block mt-1">Muncul menjelang 36 HST</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Diameter Buah</span>
            <span className="text-3xl font-black text-purple-700">{currentPoint.fruitDiameterCm} cm</span>
            <span className="text-[10px] text-slate-400 block mt-1">Fase pembesaran nanti</span>
          </div>
        </div>

        {/* Height growth trajectory chart */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700">Grafik Trajektori Panjang Sulur Semangka (cm)</span>
            <span className="text-[11px] font-semibold text-emerald-700">Target Panen: 125 cm</span>
          </div>
          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-200">
            {watermelonGrowthData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.heightCm}cm
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 relative shadow-2xs ${
                    d.hst === 35
                      ? 'bg-emerald-600 ring-2 ring-emerald-400'
                      : d.hst < 35
                      ? 'bg-emerald-400'
                      : 'bg-slate-300 border-dashed border border-slate-400'
                  }`}
                  style={{ height: `${(d.heightCm / 130) * 120}px` }}
                />
                <span className="text-[10px] font-semibold text-slate-400">
                  {d.hst}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
