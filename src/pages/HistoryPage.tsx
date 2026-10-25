import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Download, 
  Droplets,
  Brain,
  Power,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { generateHistoryPDF } from '../utils/pdfExport';

export const HistoryPage: React.FC = () => {
  const { irrigationLogs, user } = useFarm();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modeFilter, setModeFilter] = useState<'ALL' | 'Auto' | 'Manual'>('ALL');

  const filteredLogs = irrigationLogs.filter((log) => {
    const matchesSearch = 
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.decision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMode = modeFilter === 'ALL' || log.mode.toLowerCase() === modeFilter.toLowerCase();

    return matchesSearch && matchesMode;
  });

  const handleExportPDF = () => {
    generateHistoryPDF(filteredLogs, user);
  };

  return (
    <div className="space-y-5 select-none relative pb-10">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-r from-[#EAF5EF] via-[#E2F0E8] to-[#D5EADF] border border-emerald-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3323] tracking-tight">
              Riwayat Irigasi
            </h1>
            <span className="text-xl sm:text-2xl animate-bounce">📜</span>
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-[#1B5E3F] tracking-wide">
            Log Keputusan Otomatis Fuzzy Logic &amp; Kontrol Pompa
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
            Catatan historis seluruh aktivitas penyiraman tanaman semangka untuk monitoring efisiensi air dan evaluasi sistem.
          </p>
        </div>

        {/* Action Button: Export Laporan PDF */}
        <button
          onClick={handleExportPDF}
          className="px-6 py-3 rounded-full bg-[#135A3E] hover:bg-[#0E4931] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#135A3E]/20 flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Laporan (PDF)</span>
          <span>→</span>
        </button>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tanggal, alasan, atau status keputusan..."
            className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-[#F7FAF7] rounded-full border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Mode Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F4F8F5] rounded-full border border-slate-100 self-start sm:self-auto">
          {(['ALL', 'Auto', 'Manual'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setModeFilter(mode)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                modeFilter === mode
                  ? 'bg-[#135A3E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              {mode === 'ALL' ? 'Semua' : mode === 'Auto' ? 'Otomatis' : 'Manual'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LOG LIST / CARDS CONTAINER */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-7 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900">
            Daftar Aktivitas ({filteredLogs.length} Entri)
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Terbaru di Urutan Atas
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-bold text-slate-700">Tidak ada log yang sesuai</p>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter mode.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredLogs.map((log) => {
              const isAuto = log.mode.toLowerCase() === 'auto';
              const isDelayed = log.decision.toLowerCase().includes('tunda') || log.decision.toLowerCase().includes('tidak');

              return (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-[#F7FAF7] border border-slate-100/80 hover:border-emerald-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  {/* Left: Icon & Description */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isAuto 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {isAuto ? <Brain className="w-4.5 h-4.5" /> : <Power className="w-4.5 h-4.5" />}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {log.decision}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isAuto 
                            ? 'bg-emerald-100/80 text-emerald-800' 
                            : 'bg-amber-100/80 text-amber-800'
                        }`}>
                          {log.mode.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                        {log.reason}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5 font-medium">
                        <span>🕒 {log.date}</span>
                        <span>•</span>
                        <span>Durasi: {log.duration_seconds}s</span>
                        <span>•</span>
                        <span>Volume: ~{log.water_volume_liters || (log.duration_seconds * 0.07).toFixed(1)} L</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Badge */}
                  <div className="shrink-0 flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isDelayed
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isDelayed ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                      <span>{isDelayed ? 'Ditunda' : 'Selesai'}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
