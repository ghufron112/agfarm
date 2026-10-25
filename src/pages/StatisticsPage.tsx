import React, { useState } from 'react';
import { 
  BarChart3, 
  Droplets, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  Filter, 
  Clock, 
  Zap,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const StatisticsPage: React.FC = () => {
  const { sensorData } = useFarm();
  const [filterPeriod, setFilterPeriod] = useState<'7' | '30' | 'custom'>('7');

  const historyPoints = [
    { day: 'Sen (21 Okt)', moisture: 58, temp: 30, usage: 17.0, duration: 42, rainProb: 20 },
    { day: 'Sel (22 Okt)', moisture: 64, temp: 32, usage: 26.0, duration: 65, rainProb: 15 },
    { day: 'Rab (23 Okt)', moisture: 60, temp: 31, usage: 14.0, duration: 35, rainProb: 70 },
    { day: 'Kam (24 Okt)', moisture: 62, temp: 33, usage: 16.5, duration: 40, rainProb: 30 },
    { day: 'Jum (25 Okt)', moisture: 59, temp: 34, usage: 24.2, duration: 58, rainProb: 25 },
    { day: 'Sab (26 Okt)', moisture: 65, temp: 32, usage: 29.0, duration: 70, rainProb: 40 },
    { day: 'Min (27 Okt)', moisture: 62, temp: 31, usage: 12.5, duration: 30, rainProb: 65 },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📊</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Statistik &amp; Analytics Penggunaan Air
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Analisis telemetri kelembapan tanah, konsumsi debit air, dan efisiensi energi pompa.
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
          <button
            onClick={() => setFilterPeriod('7')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === '7'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setFilterPeriod('30')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === '30'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            30 Hari
          </button>
          <button
            onClick={() => setFilterPeriod('custom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === 'custom'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <div className="glass-card rounded-[28px] p-6">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400 block mb-2">TOTAL KONSUMSI AIR</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{sensorData.weekly_water_usage} L</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> 22%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hemat <strong>24.5 Liter</strong> dibanding periode 7 hari sebelumnya berkat algoritma Fuzzy.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-[28px] p-6">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400 block mb-2">TOTAL OPERASI POMPA</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">340 Menit</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> 18%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Siklus pompa efisien memperpanjang masa pakai motor DC dan menghemat listrik.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-[28px] p-6">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400 block mb-2">RATA-RATA KELEMBAPAN TANAH</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">62.8%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Sangat Ideal
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Berada tepat di rentang target 50% - 70% untuk tanaman semangka vegetatif.
          </p>
        </div>
      </div>

      {/* Main Charts: Soil Moisture & Daily Water Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Daily Water Usage */}
        <div className="glass-card rounded-[32px] p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Konsumsi Air Harian (Liter)</h3>
            </div>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded-lg">
              Rata-rata: 19.8 L/hari
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {historyPoints.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.usage}L
                </span>
                <div
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg group-hover:from-sky-700 group-hover:to-sky-500 transition-all duration-300 relative shadow-xs"
                  style={{ height: `${(item.usage / 35) * 160}px` }}
                />
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                  {item.day.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Soil Moisture Trend */}
        <div className="glass-card rounded-[32px] p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Stabilitas Kelembapan Tanah (%)</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
              Batas Ideal: 50% - 70%
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {historyPoints.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.moisture}%
                </span>
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg group-hover:from-emerald-700 group-hover:to-emerald-500 transition-all duration-300 relative shadow-xs"
                  style={{ height: `${(item.moisture / 80) * 160}px` }}
                />
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                  {item.day.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
