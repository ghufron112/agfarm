import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Droplets,
  Calendar
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { generateHistoryPDF } from '../utils/pdfExport';

export const HistoryPage: React.FC = () => {
  const { irrigationLogs, user } = useFarm();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modeFilter, setModeFilter] = useState<'ALL' | 'Auto' | 'Manual'>('ALL');

  // Filter logs simply by search and Mode (Semua, Auto, Manual - Section 17)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📜</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Riwayat Irigasi
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Log keputusan penyiraman otomatis Fuzzy Logic dan kontrol manual pompa.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-extrabold transition-all flex items-center gap-2.5 shadow-lg shadow-emerald-700/20 shrink-0 active:scale-95 group"
          title="Klik untuk membuka pratinjau dan menyimpan dokumen PDF berwarna"
        >
          <span className="p-1 rounded-lg bg-white/20 group-hover:scale-110 transition-transform">
            <Download className="w-3.5 h-3.5" />
          </span>
          <span>Export Laporan (PDF)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950/30 text-emerald-100 font-bold">
            Warna
          </span>
        </button>
      </div>

      {/* Filter Tabs: Semua | Auto | Manual (Section 17) */}
      <div className="glass-card rounded-[24px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tanggal atau alasan..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Mode Filter: Semua | Auto | Manual */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setModeFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              modeFilter === 'ALL'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setModeFilter('Auto')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              modeFilter === 'Auto'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setModeFilter('Manual')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              modeFilter === 'Manual'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manual
          </button>
        </div>
      </div>

      {/* Simple Clean Table (Section 17) */}
      <div className="glass-card rounded-[28px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/70">
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Waktu</th>
                <th className="py-3.5 px-4">Mode</th>
                <th className="py-3.5 px-4">Durasi</th>
                <th className="py-3.5 px-4">Volume</th>
                <th className="py-3.5 px-4">Keputusan</th>
                <th className="py-3.5 px-4">Alasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isAuto = log.mode.toLowerCase() === 'auto';
                const isDelayed = log.decision.toLowerCase().includes('ditunda');
                return (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {log.date}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {log.time}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        isAuto ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {log.mode.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {Math.ceil(log.duration_seconds / 60)} menit
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-700">
                      {log.water_volume_liters} L
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-bold ${isDelayed ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {log.decision}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {log.reason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
